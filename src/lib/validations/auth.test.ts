import { loginSchema, registerSchema } from './auth'

describe('Auth Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123'
      }
      
      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123'
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('有効なメールアドレスを入力してください')
      }
    })

    it('should reject short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345'
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('パスワードは6文字以上で入力してください')
      }
    })

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        password: 'password123'
      }
      
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'Test User'
      }
      
      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject when passwords do not match', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
        name: 'Test User'
      }
      
      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('パスワードが一致しません')
      }
    })

    it('should reject invalid email in registration', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'Test User'
      }
      
      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short password in registration', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
        confirmPassword: '123',
        name: 'Test User'
      }
      
      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty name', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        name: ''
      }
      
      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('名前を入力してください')
      }
    })
  })
})