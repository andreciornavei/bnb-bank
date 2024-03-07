export type HttpMessageType = {
  error: {
    message: string
    fields: Record<string, string[]>
  }
}
