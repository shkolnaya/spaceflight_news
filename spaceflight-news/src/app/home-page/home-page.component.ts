import { Article } from './../../core/interfaces/article';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ThumbnailComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  constructor(
    private articlesService: ArticlesService
  ){}

  articles: Article[];
  pageSize: number = 6;
  filter: any = {
    limit: 6
  }

  ngOnInit(): void {
    this.processData(this.filter);
  }

  processData(filter: any){
    this.articlesService.getFilteredArticles(filter).subscribe(
      res => {
        this.articles = res.results;
      }
    )
  }
}
