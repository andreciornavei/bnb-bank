export type HttpMessageType = {
  code: number
  kind: 'success' | 'error'
  name: string
  title: string
  message: string
  solution?: string
  errors?: Record<string, string>
}
