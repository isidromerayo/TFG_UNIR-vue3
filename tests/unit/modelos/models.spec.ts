import { describe, it, expect } from 'vitest'
import { Actualizacion } from '@/model/actualizacion'
import { Categoria } from '@/model/categoria'
import { Instructor } from '@/model/instructor'
import { Curso } from '@/model/curso'

describe('Data Models', () => {
  it('Actualizacion model instantiates correctly', () => {
    const model = new Actualizacion('1', 'Titulo', 'Desc', '2023-01-01')
    expect(model.id).toBe('1')
    expect(model.titulo).toBe('Titulo')
    expect(model.descripcion).toBe('Desc')
    expect(model.fechaActualizacion).toBe('2023-01-01')
  })

  it('Categoria model instantiates correctly', () => {
    const model = new Categoria(1, 'Nombre', 'Desc')
    expect(model.id).toBe(1)
    expect(model.nombre).toBe('Nombre')
    expect(model.descripcion).toBe('Desc')
  })

  it('Instructor model instantiates correctly', () => {
    const model = new Instructor('Nombre', 'Apellidos', 'Desc')
    expect(model.nombre).toBe('Nombre')
    expect(model.apellidos).toBe('Apellidos')
    expect(model.descripcion).toBe('Desc')
  })

  it('Instructor model instantiates with optional values', () => {
    const model = new Instructor()
    expect(model.nombre).toBeUndefined()
  })

  it('Curso model instantiates correctly', () => {
    const instructor = new Instructor('I', 'A', 'D')
    const model = new Curso(1, 'T', 'D', 5, 100, '2023', '2023', instructor)
    expect(model.id).toBe(1)
    expect(model.instructor).toBe(instructor)
  })
})
