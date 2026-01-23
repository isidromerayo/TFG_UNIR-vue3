export interface Usuario {
    id: number
    username: string
    email: string
    nombre?: string
    apellidos?: string
    descripcion?: string
}

export interface Instructor {
    id?: number
    nombre?: string
    apellidos?: string
    descripcion?: string
}

export interface Categoria {
    id: number
    nombre: string
    descripcion?: string
}

export interface Actualizacion {
    id: number
    titulo: string
    descripcion: string
    fecha: string
}

export interface Curso {
    id: number
    titulo: string
    descripcion: string
    valoracionMedia: number
    precio: number
    fechaCreacion: string
    fechaActualizacion: string
    instructor?: Instructor
    categoria?: Categoria
}
