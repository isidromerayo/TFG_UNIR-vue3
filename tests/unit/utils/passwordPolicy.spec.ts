import { describe, it, expect } from 'vitest';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  passwordSchema,
} from '@/utils/passwordPolicy';

describe('passwordPolicy', () => {
  it('usa los límites del backend', () => {
    expect(PASSWORD_MIN_LENGTH).toBe(8);
    expect(PASSWORD_MAX_LENGTH).toBe(72);
  });

  it('rechaza 7 caracteres', () => {
    expect(passwordSchema.isValidSync('1234567')).toBe(false);
    expect(() => passwordSchema.validateSync('1234567')).toThrow(
      'La contraseña debe tener al menos 8 caracteres'
    );
  });

  it('acepta 8 caracteres', () => {
    expect(passwordSchema.isValidSync('12345678')).toBe(true);
  });

  it('acepta 72 caracteres', () => {
    expect(passwordSchema.isValidSync('a'.repeat(72))).toBe(true);
  });

  it('rechaza 73 caracteres', () => {
    expect(passwordSchema.isValidSync('a'.repeat(73))).toBe(false);
    expect(() => passwordSchema.validateSync('a'.repeat(73))).toThrow(
      'La contraseña no puede superar los 72 caracteres'
    );
  });

  it('rechaza la contraseña vacía', () => {
    expect(passwordSchema.isValidSync('')).toBe(false);
  });
});
