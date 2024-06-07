import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor( private httpClient: HttpClient ) { }

  private apiUrl: string = environment.apiEndoint;

  protected get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${url}`);
  }

  protected getByUrl<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}
