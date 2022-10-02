import {Entity, model, property} from '@loopback/repository';

@model()
export class Movimiento extends Entity {
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
    required: true,
  })
  logo: string;


  constructor(data?: Partial<Movimiento>) {
    super(data);
  }
}

export interface MovimientoRelations {
  // describe navigational properties here
}

export type MovimientoWithRelations = Movimiento & MovimientoRelations;
