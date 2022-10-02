import {Entity, model, property} from '@loopback/repository';

@model()
export class Eleccion extends Entity {
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
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Eleccion>) {
    super(data);
  }
}

export interface EleccionRelations {
  // describe navigational properties here
}

export type EleccionWithRelations = Eleccion & EleccionRelations;
