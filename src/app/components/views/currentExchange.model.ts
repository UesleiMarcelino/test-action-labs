export interface CurrentExchangeModel {
  exchangeRate: number | null;
  fromSymbol: string;
  lastUpdatedAt: Date | null;
  rateLimitExceeded: boolean | null;
  success: boolean | null;
  toSymbol: string;
}