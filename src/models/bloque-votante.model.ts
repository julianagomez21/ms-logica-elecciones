import {Entity, model, property} from '@loopback/repository';

@model()
export class BloqueVotante extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  bloqueId?: number;

  @property({
    type: 'number',
  })
  votanteId?: number;

  constructor(data?: Partial<BloqueVotante>) {
    super(data);
  }
}

export interface BloqueVotanteRelations {
  // describe navigational properties here
}

export type BloqueVotanteWithRelations = BloqueVotante & BloqueVotanteRelations;
