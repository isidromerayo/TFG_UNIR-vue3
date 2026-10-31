import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { API_URL } from '@/utils/constants'

/**
 * Tests de la instancia compartida (@/utils/api).
 *
 * Se sustituye axios por una versión mínima que registra los interceptors
 * y devuelve una instancia "callable" para poder simular el reintento
 * (`api(config)`), igual que hace el spec equivalente de la instancia de React.
 */

const createArgs: any[] = []
const requestHandlers: any[] = []
const responseHandlers: any[] = []
let instanceCalls: any[] = []

function makeInstance() {
  const instance: any = (config: any) => {
    instanceCalls.push(config)
    return Promise.resolve('RETRY_OK')
  }
  instance.defaults = createArgs[0]
  instance.interceptors = {
    request: {
      use: (fulfilled: any, rejected: any) => requestHandlers.push({ fulfilled, rejected }),
      eject: (id: any) => { void id }
    },
    response: {
      use: (fulfilled: any, rejected: any) => responseHandlers.push({ fulfilled, rejected }),
      eject: (id: any) => { void id }
    }
  }
  return instance
}

const axiosMock: any = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  create: (...args: any[]) => {
    createArgs.push(args[0])
    return makeInstance()
  }
}

vi.mock('axios', () => ({
  __esModule: true,
  default: axiosMock
}))

const { default: api } = await import('@/utils/api')

const retryHandler = responseHandlers[0]
const errorHandler = responseHandlers[1]

describe('utils/api', () => {
  beforeEach(() => {
    instanceCalls = []
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('configura la instancia con baseURL, headers, timeout y validateStatus', () => {
    expect(createArgs).toHaveLength(1)
    const config = createArgs[0]

    expect(config.baseURL).toBe(API_URL)
    expect(config.timeout).toBe(30000)
    expect(config.withCredentials).toBe(false)
    expect(config.headers['Accept']).toBe('application/json, application/hal+json')
    expect(config.headers['Content-Type']).toBe('application/json')

    const validate = config.validateStatus as (status: number) => boolean
    expect(validate(200)).toBe(true)
    expect(validate(299)).toBe(true)
    expect(validate(304)).toBe(true)
    expect(validate(400)).toBe(false)
    expect(validate(401)).toBe(false)
    expect(validate(500)).toBe(false)
  })

  it('registra los interceptors de respuesta (retry y error)', () => {
    expect(responseHandlers).toHaveLength(2)
    expect(typeof retryHandler.rejected).toBe('function')
    expect(typeof errorHandler.rejected).toBe('function')
  })

  describe('interceptor de retry', () => {
    it('rechaza cuando el error no lleva config', async () => {
      await expect(retryHandler.rejected({ message: 'boom' })).rejects.toThrow('boom')
    })

    it('no reintenta peticiones no idempotentes (POST) ni errores 4xx', async () => {
      const err: any = {
        config: { method: 'post' },
        response: { status: 400 },
        message: 'Bad Request'
      }

      await expect(retryHandler.rejected(err)).rejects.toBe(err)
      expect(instanceCalls).toHaveLength(0)
    })

    it('no reintenta peticiones canceladas', async () => {
      const err: any = {
        config: { method: 'get' },
        code: 'ERR_CANCELED',
        message: 'canceled'
      }

      await expect(retryHandler.rejected(err)).rejects.toBe(err)
      expect(instanceCalls).toHaveLength(0)
    })

    it('no reintenta errores sin respuesta cuando el método no es idempotente', async () => {
      const err: any = {
        config: { method: 'delete' },
        message: 'network error'
      }

      await expect(retryHandler.rejected(err)).rejects.toBe(err)
      expect(instanceCalls).toHaveLength(0)
    })

    it('hasta agotar maxRetries vuelve a rechazar el error original', async () => {
      const err: any = {
        config: { method: 'get', _retryCount: 3 },
        response: { status: 500 },
        message: 'Server Error'
      }

      await expect(retryHandler.rejected(err)).rejects.toBe(err)
      expect(instanceCalls).toHaveLength(0)
    })

    it('reintenta errores transitorios (5xx) en GET con backoff incremental', async () => {
      vi.useFakeTimers()
      const err: any = {
        config: { method: 'get' },
        response: { status: 500 },
        message: 'Server Error'
      }

      const promise = retryHandler.rejected(err)
      await vi.runAllTimersAsync()

      await expect(promise).resolves.toBe('RETRY_OK')
      expect(err.config._retryCount).toBe(1)
      expect(instanceCalls).toHaveLength(1)
      expect(instanceCalls[0]).toBe(err.config)
    })

    it('reintenta errores de red (sin respuesta) en GET', async () => {
      vi.useFakeTimers()
      const err: any = {
        config: { method: 'get' },
        message: 'Network Error'
      }

      const promise = retryHandler.rejected(err)
      await vi.runAllTimersAsync()

      await expect(promise).resolves.toBe('RETRY_OK')
      expect(err.config._retryCount).toBe(1)
    })
  })

  describe('interceptor de errores', () => {
    it('enriquece el mensaje conservando el error original (response, status)', async () => {
      const err: any = {
        response: { status: 400, data: { message: 'Los datos no son válidos' } },
        config: { url: 'usuarios' },
        message: 'Request failed with status code 400'
      }

      await expect(errorHandler.rejected(err)).rejects.toBe(err)
      expect(err.message).toBe('Los datos no son válidos')
      expect(err.response.status).toBe(400)
    })

    it('usa "Server Error" cuando la respuesta no trae mensaje', async () => {
      const err: any = {
        response: { status: 500, data: {} },
        config: { url: 'cursos' }
      }

      await expect(errorHandler.rejected(err)).rejects.toBe(err)
      expect(err.message).toBe('Server Error')
    })

    it('aplica mensaje de red cuando la petición no obtuvo respuesta', async () => {
      const err: any = {
        request: {},
        config: { url: 'cursos' },
        message: 'Network Error'
      }

      await expect(errorHandler.rejected(err)).rejects.toBe(err)
      expect(err.message).toBe(
        'No se pudo conectar con el servidor. Por favor, verifique su conexión a internet.'
      )
      expect(err.request).toBeDefined()
    })

    it('conserva el mensaje original en errores de configuración', async () => {
      const err: any = {
        message: 'Invalid URL',
        config: {}
      }

      await expect(errorHandler.rejected(err)).rejects.toBe(err)
      expect(err.message).toBe('Invalid URL')
    })
  })

  it('expone la instancia callable y sus defaults', () => {
    expect(typeof api).toBe('function')
    expect(api.defaults).toBe(createArgs[0])
  })
})
