import { DailyExchangeModel } from './exchange-rate/dailyExchange.model';
import { CurrentExchangeModel } from './currentExchange.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  ExchangeCurrentURL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/currentExchangeRate?'
  ExchangeDailyURL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/dailyExchangeRate?'
  apiKey = 'apiKey=RVZG0GHEV2KORLNA'

  constructor( private http: HttpClient) { }

  /**
   * Retorna os dados gerais da Api do convenio no Menu Configuração.
   *
   * @param fromSymbol
   * @param toSymbol
   */
  getExchangeCurrent(fromSymbol: any, toSymbol: any): Observable<CurrentExchangeModel> {
    return this.http.get<CurrentExchangeModel>(`${this.ExchangeCurrentURL}${this.apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`);
  }
  getDailyExchange(fromSymbol: any, toSymbol: any): Observable<DailyExchangeModel[]> {
    return this.http.get<DailyExchangeModel[]>(`${this.ExchangeDailyURL}${this.apiKey}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`);
  }
}
