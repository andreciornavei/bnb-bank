export enum TransactionStatusEnum {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export type TransactionStatusEnumKeys = keyof typeof TransactionStatusEnum
