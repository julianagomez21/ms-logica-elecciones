import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Candidato} from './candidato.model';
import {Voto} from './voto.model';
import {Cargo} from './cargo.model';

@model()
export class Plancha extends Entity {
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
  lema: string;

  @hasMany(() => Candidato)
  candidatos: Candidato[];

  @hasMany(() => Voto)
  votos: Voto[];

  @belongsTo(() => Cargo)
  cargoId: number;

  constructor(data?: Partial<Plancha>) {
    super(data);
  }
}

export interface PlanchaRelations {
  // describe navigational properties here
}

export type PlanchaWithRelations = Plancha & PlanchaRelations;
