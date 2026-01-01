import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter } from '@/router/index'
import { getToken } from '@/services/session'

vi.mock('@/services/session', () => ({
  getToken: vi.fn()
}))

vi.mock('vue-router', async (importOriginal) => {
  const actual: any = await importOriginal()
  return {
    ...actual
  }
})

describe('Router', () => {
  let router: any

  beforeEach(() => {
    vi.clearAllMocks()
    router = createRouter()
  })

  it('navigates to /home', async () => {
    router.push('/home')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('navigates to /categorias', async () => {
    router.push('/categorias')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('categorias')
  })

  describe('navigation guards', () => {
    it('redirects to /acceso if accessing protected route without token', async () => {
      ;(getToken as any).mockReturnValue(null)
      
      router.push('/mis-cursos')
      await router.isReady()
      
      expect(router.currentRoute.value.path).toBe('/acceso')
    })

    it('allows access to protected route if token exists', async () => {
      ;(getToken as any).mockReturnValue('fake-token')
      
      router.push('/mis-cursos')
      await router.isReady()
      
      expect(router.currentRoute.value.name).toBe('mis-cursos')
    })
  })

  it('navigates to 404 for unknown routes', async () => {
    router.push('/non-existent-page')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('404')
  })
})
