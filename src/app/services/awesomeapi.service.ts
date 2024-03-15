import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwesomeApiService {

  constructor(private http: HttpClient) { }

  getMoedas(): Observable<Moeda[]> {
    return this.http.get('https://economia.awesomeapi.com.br/json/available/uniq')
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

}
