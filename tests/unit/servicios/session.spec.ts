import { describe, it, expect, beforeEach } from 'vitest'
import { setToken, getToken, removeToken, setUser, getUser, removeUser } from '@/services/session'
import { TOKEN, USER } from '@/utils/constants'

describe('session service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('manages token correctly', () => {
    setToken('test-token')
    expect(localStorage.getItem(TOKEN)).toBe('test-token')
    expect(getToken()).toBe('test-token')
    
    removeToken()
    expect(localStorage.getItem(TOKEN)).toBeNull()
    expect(getToken()).toBeNull()
  })

  it('manages user correctly', () => {
    setUser('test-user')
    expect(localStorage.getItem(USER)).toBe('test-user')
    expect(getUser()).toBe('test-user')
    
    removeUser()
    expect(localStorage.getItem(USER)).toBeNull()
    expect(getUser()).toBe('')
  })

  it('returns empty string when user is not in localStorage', () => {
    expect(getUser()).toBe('')
  })
})
