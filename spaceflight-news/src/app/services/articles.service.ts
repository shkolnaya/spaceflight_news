import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { HttpClient } from '@angular/common/http';
import { ArticlesResult } from '../../core/interfaces/articles-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends BaseService{

  constructor ( httpClient: HttpClient ) {
    super(httpClient)
  }

  getFilteredArticles(filters: any): Observable<ArticlesResult> {
    const params = new URLSearchParams(filters).toString();
    return this.get<ArticlesResult>(`articles?${params}`)
  }
}
