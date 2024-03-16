import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwesomeApiService {

  private URL_API = 'https://economia.awesomeapi.com.br';

  constructor(private http: HttpClient) { }

  getMoedas(): Observable<Moeda[]> {
    return this.http.get(`${this.URL_API}/json/available/uniq`)
      .pipe(
        map((moedas: any) => {
          return Object.keys(moedas).map(key => {
            return {
              codigo: key,
              descricao: moedas[key]
            };
          });
        })
      );
  }

  getCotacao(moedaOrigem: Moeda, moedaDestino: Moeda): Observable<any> {
    return this.http.get(`${this.URL_API}/last/${moedaOrigem.codigo}-${moedaDestino.codigo}`);
  }

}
