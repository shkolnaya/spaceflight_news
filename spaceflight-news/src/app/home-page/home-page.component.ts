import { Article } from './../../core/interfaces/article';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ArticlesService } from '../services/articles.service';
import { FilterComponent } from './filter/filter.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable, concat, filter, forkJoin, map, repeat, tap } from 'rxjs';
import { ArticlesResult } from '../../core/interfaces/articles-result';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ThumbnailComponent, FilterComponent, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService
  ){}

  articles: Article[];
  totalCount: number = 0;
  pageSize: number = 6;
  pageIndex: number = 0;
  isLoading: boolean = false;
  keywords: string = '';
  titleArticlesCount: number;
  nextRequestUrl: string;

  field: 'title' | 'summary' = 'title';
  summaryFirstOffset: number = 0;
  
  private get filter(): any {
    return {
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
    }
  };

  private get titleFilter(): any {
    return {
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
      title_contains_one: this.keywords,
    }
  };

  private get summaryFilter(): any {
    return {
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize + this.summaryFirstOffset,
      summary_contains_one: this.keywords,
    }
  };


  ngOnInit(): void {
    this.keywords = this.route.snapshot.queryParamMap.get('keywords') || '';
    this.resetState();
    this.processData();    
  }

  keywordsChanged(newKeywords: string) {
    if (this.keywords === newKeywords)
      return;
    
    this.keywords = newKeywords;
    this.resetState();
    this.processData();   
    
    if(this.keywords){
      this.router.navigate([''], {
        queryParams: {
          'keywords': this.keywords
        }
      })
    } else {
      this.router.navigate([''])
    }
  }

  private resetState() {
    this.stateWithKeywords = 'title';
    this.stateWithouKeywords = 'start';
  }

  processData(){
    if (!this.keywords) {
      this.loadMoreWithoutKeywords();
    } else {
      this.loadMoreWithKeywords();
    }
  }

  private stateWithKeywords: 'title' | 'titleIterate' | 'summary' | 'sumaryIterate' | 'end' = 'title';
  private stateWithouKeywords: 'start' | 'iterate' | 'end';

  loadMoreWithoutKeywords() {
    this.isLoading = true;

    switch(this.stateWithouKeywords) {
      case 'start':
        this.articlesService.getFilteredArticles(this.filter).subscribe(
          res => {
            this.articles = res.results;
            this.totalCount = res.count;
            this.nextRequestUrl = res.next;
            this.stateWithouKeywords = 'iterate';

            this.isLoading = false;
          }, 
        );
        break;
      case 'iterate':
        this.articlesService.getArticlesByNextUrl(this.nextRequestUrl).subscribe(
          res => {
            this.articles.push(...res.results);
            this.nextRequestUrl = res.next;
    
            if(!res.next){
              this.stateWithouKeywords = 'end';
            }
    
            this.isLoading = false;
          }
        )
        break;
      case 'end':
        return
    }

  }

  loadMoreWithKeywords() {
    this.isLoading = true;

    switch(this.stateWithKeywords) {
      case 'title':
        forkJoin({
          inTitleResults: this.articlesService.getFilteredArticles(this.titleFilter),
          inSummaryResults: this.articlesService.getFilteredArticles(this.summaryFilter),
          inTitleAndSummaryResults: this.articlesService.getFilteredArticles({...this.titleFilter, ...this.summaryFilter})
        }).subscribe(
          ({inTitleResults, inSummaryResults, inTitleAndSummaryResults}) => {
            this.totalCount = inTitleResults.count + inSummaryResults.count - inTitleAndSummaryResults.count;
            
            this.articles = inTitleResults.results;
            this.nextRequestUrl = inTitleResults.next;
            this.stateWithKeywords = 'titleIterate';
  
            this.isLoading = false;
          }
        );
        break;
      case 'titleIterate':
        this.articlesService.getArticlesByNextUrl(this.nextRequestUrl).subscribe(
          res => {
            this.articles.push(...res.results);
            this.nextRequestUrl = res.next;
            this.isLoading = false;

            if (!res.next) {
              this.stateWithKeywords = 'summary';
            }
          }
        );
        break;
      case 'summary':
        this.articlesService.getFilteredArticles(this.summaryFilter).subscribe(
          res => {
            this.articles.push(...res.results);
            this.nextRequestUrl = res.next;
            this.isLoading = false;

            this.stateWithKeywords = 'sumaryIterate';
          }
        );
        break;
      case 'sumaryIterate':
        this.articlesService.getArticlesByNextUrl(this.nextRequestUrl).subscribe(
          res => {
            this.articles.push(...res.results);
            this.nextRequestUrl = res.next;
            this.isLoading = false;

            if (!res.next) {
              this.stateWithKeywords = 'end';
            }
          }
        )
        break;      
      case 'end':
        return;
    }
  }
}
