import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Cotacao } from '../models/cotacao.model';

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
        }),
        map((moedas: Moeda[]) => {
          return moedas.sort((a, b) => a.descricao.localeCompare(b.descricao));
        })
      );
  }

  getMoeda(code: string): Observable<Moeda | undefined> {
    return this.getMoedas()
      .pipe(map((moedas: Moeda[]) => {
        return moedas.find((moeda: Moeda) => moeda.codigo === code);
      }));
  }

  getCotacao(moedaOrigem: Moeda, moedaDestino: Moeda): Observable<Cotacao> {
    return this.http.get(`${this.URL_API}/last/${moedaOrigem.codigo}-${moedaDestino.codigo}`)
      .pipe(
        delay(1000),
        map((value: any) => {
          let firstKey = Object.keys(value).shift();
          return new Cotacao(value[firstKey!]);
        })
      );
  }

  getCotacoes(): Observable<Cotacao[]> {
    let combinacoes = [
      'USD-BRL', 'CAD-BRL', 'EUR-BRL', 'GBP-BRL', 'ARS-BRL',
      'BTC-BRL', 'JPY-BRL', 'CHF-BRL', 'AUD-BRL', 'MXN-BRL'
    ];
    let moedas = combinacoes.join(',');

    return this.http.get(`${this.URL_API}/last/${moedas}`)
      .pipe(
        map((cotacoes: any) => {
          return Object.keys(cotacoes)
            .map((key: string) => new Cotacao(cotacoes[key]));
        })
      );
  }

}
