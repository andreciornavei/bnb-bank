import moment from 'moment'

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (date: Date, format?: string): string => {
  return moment(date).format(format || 'MMMM, YYYY')
}
