import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Movimiento} from './movimiento.model';
import {Plancha} from './plancha.model';

@model({
  settings: {
    foreignKeys: {

    }
  }
})

export class Candidato extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @belongsTo(() => Movimiento)
  movimientoId: number;

  @belongsTo(() => Plancha)
  planchaId: number;

  constructor(data?: Partial<Candidato>) {
    super(data);
  }
}

export interface CandidatoRelations {
  // describe navigational properties here
}

export type CandidatoWithRelations = Candidato & CandidatoRelations;
