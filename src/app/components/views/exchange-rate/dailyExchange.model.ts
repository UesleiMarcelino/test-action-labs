import { DataDailyExchangeModel } from "./dataDailyExchange.model";

export class DailyExchangeModel {
  from: string = '';
  lastUpdatedAt: number;
  success: boolean;
  to: string = 'BRL';
  data: DataDailyExchangeModel[]
}