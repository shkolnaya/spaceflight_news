import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../../core/interfaces/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent implements OnInit{

  constructor( 
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
  ){}

  article: Article;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.articlesService.getArticleById(id).subscribe(
          res => {
            this.article = res
          }
        )
      }
    })
  }
}
