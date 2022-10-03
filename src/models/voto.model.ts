import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plancha} from './plancha.model';

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

  @belongsTo(() => Plancha)
  planchaId: number;

  constructor(data?: Partial<Voto>) {
    super(data);
  }
}

export interface VotoRelations {
  // describe navigational properties here
}

export type VotoWithRelations = Voto & VotoRelations;
