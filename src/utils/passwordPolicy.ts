import * as Yup from 'yup';

/**
 * Límites del backend (UsuarioRegistroRequest: @Size(min = 8, max = 72)).
 * Mantenerlos aquí evita que el formulario y la API se desalineen.
 */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

export const PASSWORD_LENGTH_HINT =
  `Entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`;

export const passwordSchema = Yup.string()
  .required()
  .min(
    PASSWORD_MIN_LENGTH,
    `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`
  )
  .max(
    PASSWORD_MAX_LENGTH,
    `La contraseña no puede superar los ${PASSWORD_MAX_LENGTH} caracteres`
  );
