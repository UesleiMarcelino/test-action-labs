import { DataDailyExchangeModel } from './dataDailyExchange.model';
import { DailyExchangeModel } from './dailyExchange.model';
import { CurrentExchangeModel } from './../currentExchange.model';

import { Component, Input, OnInit } from '@angular/core';
import { ExchangeService } from '../exchange.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public dailyDados: DailyExchangeModel;
  public dataGeneral: any;
  public dataDailyGeneral: any;
  public totalDiff: any;
  public resultDiff: any[] = [];

  currentExchange: CurrentExchangeModel = {
    exchangeRate: null,
    toSymbol: 'BRL',
    fromSymbol: '',
    lastUpdatedAt: null,
    rateLimitExceeded: null,
    success: null,
  };
  openDiff: any;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {}

  getCurrentExchange() {
    this.exchangeService
      .getExchangeCurrent(
        this.currentExchange.fromSymbol,
        this.currentExchange.toSymbol
      )
      .subscribe(data => {
        this.currentExchange = data;
        this.getDailyExchange();
        console.log(this.currentExchange)
      });
  }

  getDailyExchange() {
    this.dailyDados = new DailyExchangeModel();
    this.dailyDados.from = this.currentExchange.fromSymbol;
    this.exchangeService
      .getDailyExchange(this.dailyDados.from, this.dailyDados.to)
      .subscribe(res => {
        this.dataGeneral = res;
        this.dadosMap();
      });
  }

  dadosMap() {
    this.dataDailyGeneral = this.dataGeneral.data
      .slice(0, 5)
      .map((x: any) => x);

    this.openDiff = this.dataDailyGeneral.map((x: any) => x.open);
    console.log(this.openDiff);

    this.calculaDiff();
  }

  calculaDiff() {
    // var total: any = [];
    // for (var i = 0; i < this.openDiff.length; i++) {
    //   this.totalDiff = this.openDiff[i] - this.openDiff[i - 1];
    //   if (isNaN(this.totalDiff)) {
    //     this.totalDiff = '-' as const;
    //   }
    //   console.log(this.totalDiff);
    // }
    this.totalDiff = this.openDiff.map((x: any, i: any) =>
     this.openDiff[i] - this.openDiff[i - 1]
     );
    this.dataDailyGeneral.forEach((element: any, index: any) => {
      if(element.diff === this.openDiff) {
        this.dataDailyGeneral[index] = this.openDiff
      }
      console.log(this.dataDailyGeneral)
    });
  }
}
