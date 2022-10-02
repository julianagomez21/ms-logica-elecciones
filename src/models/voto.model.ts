import {Entity, model, property} from '@loopback/repository';

@model()
export class Voto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaHora: string;


  constructor(data?: Partial<Voto>) {
    super(data);
  }
}

export interface VotoRelations {
  // describe navigational properties here
}

export type VotoWithRelations = Voto & VotoRelations;
