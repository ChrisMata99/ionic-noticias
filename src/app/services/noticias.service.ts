import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const proxyUrl = environment.proxyUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';

  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
    // return this.http.get<T>(query + '&apiKey=' + apiKey);
  }

  getTopHeadlines() {
    this.headlinesPage++;
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&apiKey=35076c7b11d3458cb7b17cdab12edb5f');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

  }

  getTopHeadlinesCategoria(categoria: string) {

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=35076c7b11d3458cb7b17cdab12edb5f');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
