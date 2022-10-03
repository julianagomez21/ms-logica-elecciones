import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Plancha} from './plancha.model';
import {Eleccion} from './eleccion.model';
import {Bloque} from './bloque.model';
import {BloqueCargo} from './bloque-cargo.model';

@model()
export class Cargo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Plancha)
  planchas: Plancha[];

  @belongsTo(() => Eleccion)
  eleccionId: number;

  @hasMany(() => Bloque, {through: {model: () => BloqueCargo}})
  bloques: Bloque[];

  constructor(data?: Partial<Cargo>) {
    super(data);
  }
}

export interface CargoRelations {
  // describe navigational properties here
}

export type CargoWithRelations = Cargo & CargoRelations;
