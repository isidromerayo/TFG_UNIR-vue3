import { describe, it, expect } from 'vitest'
import type { AxiosError } from 'axios'

import {
  authErrorMessage,
  formatError,
  retryAfterSeconds,
} from '@/utils/api-error'

/** Error mínimo de axios con la respuesta que se quiera simular. */
function axiosError(status?: number, data?: unknown, headers?: Record<string, unknown>): AxiosError {
  return {
    response: status === undefined ? undefined : { status, data, headers },
  } as unknown as AxiosError
}

describe('utils/api-error', () => {
  describe('formatError', () => {
    it('devuelve la cadena cuando el error ya es un texto', () => {
      expect(formatError('Fallo textual')).toBe('Fallo textual')
    })

    it('da prioridad a los errores de validación por campo', () => {
      const body = { message: 'Varios errores', errors: { password: 'muy corta', email: 'inválido' } }
      expect(formatError(body)).toBe('muy corta. inválido')
    })

    it('usa el message cuando no hay errores por campo', () => {
      expect(formatError({ message: 'Usuario duplicado' })).toBe('Usuario duplicado')
    })

    it('devuelve "Error desconocido" para entradas vacías', () => {
      expect(formatError(undefined)).toBe('Error desconocido')
      expect(formatError('')).toBe('Error desconocido')
      expect(formatError({})).toBe('Error desconocido')
    })
  })

  describe('retryAfterSeconds', () => {
    it('lee la cabecera en minúsculas (axios la normaliza)', () => {
      expect(retryAfterSeconds(axiosError(429, {}, { 'retry-after': '30' }))).toBe(30)
    })

    it('acepta también la cabecera en su forma original', () => {
      expect(retryAfterSeconds(axiosError(429, {}, { 'Retry-After': '45' }))).toBe(45)
    })

    it('devuelve 0 si la cabecera no viene o no es un número positivo', () => {
      expect(retryAfterSeconds(axiosError(429, {}, {}))).toBe(0)
      expect(retryAfterSeconds(axiosError(429, {}, { 'retry-after': 'soon' }))).toBe(0)
      expect(retryAfterSeconds(axiosError(429, {}, { 'retry-after': '0' }))).toBe(0)
      expect(retryAfterSeconds(axiosError(429, {}, { 'retry-after': '-5' }))).toBe(0)
    })

    it('devuelve 0 cuando no hay respuesta', () => {
      expect(retryAfterSeconds(axiosError())).toBe(0)
    })
  })

  describe('authErrorMessage', () => {
    it('mantiene la redacción de credenciales para 401', () => {
      expect(authErrorMessage(axiosError(401, { message: 'No autorizado' })))
        .toBe('No se ha podido logear, revise usuario/contraseña')
    })

    it('da mensaje propio para 403 (anti-enumeración del backend)', () => {
      expect(authErrorMessage(axiosError(403, { message: 'Prohibido' })))
        .toBe('No tiene permiso para realizar esta operación')
    })

    it('incluye los segundos de Retry-After en 429', () => {
      expect(authErrorMessage(axiosError(429, {}, { 'retry-after': '57' })))
        .toBe('Demasiados intentos seguidos, vuelva a intentarlo en 57 segundos')
    })

    it('usa un mensaje genérico de 429 si no hay Retry-After', () => {
      expect(authErrorMessage(axiosError(429, {}, {})))
        .toBe('Demasiados intentos seguidos, espere unos minutos y vuelva a intentarlo')
    })

    it('formatea el cuerpo de error en otros estados', () => {
      expect(authErrorMessage(axiosError(500, { message: 'Error interno' })))
        .toBe('No se ha podido acceder: Error interno')
    })

    it('mantiene la redacción de credenciales sin respuesta de servidor', () => {
      expect(authErrorMessage(axiosError())).toBe('No se ha podido logear, revise usuario/contraseña')
      expect(authErrorMessage(undefined)).toBe('No se ha podido logear, revise usuario/contraseña')
    })
  })
})
