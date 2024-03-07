export enum TransactionFactorEnum {
  deposit = 1,
  expense = -1,
}

export type TransactionFactorEnumKeys = keyof typeof TransactionFactorEnum
