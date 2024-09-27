import humps, { Camelized } from 'humps'
import { REGEX_SNAKE_CASE } from '../utils/regex.util'

export function httpReponseAdapter<T>(data: T): Camelized<T> {
  return humps.camelizeKeys<T>(data)
}

export function httpRequestAdapter<T>(data: T): T {
  return humps.decamelizeKeys(data, {
    separator: '_',
    process: function (key, convert, options) {
      return REGEX_SNAKE_CASE.test(key) ? key : convert(key, options)
    },
  }) as T
}
