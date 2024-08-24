export type Type = 'text' | 'editor' | 'readonly' | 'email' | 'textarea' | 'date' | 'pass' | 'showpass' | 'number' | 'currency' | 'datetime' | 'time' | 'file' | 'select' | 'bool' | 'list' | 'html' | 'map'

export type validType = 'required' | 'noSpace' | 'email' | 'noSymbol' | 'numeric' | 'combinedValidation' | 'minLength'

export type form = {
  model: string
  type: Type
  label: string
  extension?: string
  allow?: string[]
  place?: string
  list?: any[]
  display?: string
  value?: string
  required?: boolean
  validation: validType[]
  action?: string
  id?: string
  status?: boolean
  title?: string
  format?: boolean
  formatAction?: string
  lat?: number
  long?: number
  class?: string
}