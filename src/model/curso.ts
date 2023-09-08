import type { Instructor } from './instructor';

export class Curso{
    constructor(public id?: number,public titulo?:string, public descripcion?:string,public valoracionMedia?: number, public precio?: number, public fechaCreacion?: string, public fechaActualizacion?: string, public instructor?: Instructor ){}
}