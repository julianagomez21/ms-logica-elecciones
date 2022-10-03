import {Entity, model, property, hasMany} from '@loopback/repository';
import {Votante} from './votante.model';
import {BloqueVotante} from './bloque-votante.model';
import {Cargo} from './cargo.model';
import {BloqueCargo} from './bloque-cargo.model';

@model()
export class Bloque extends Entity {
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
  descripcion: string;

  @hasMany(() => Votante, {through: {model: () => BloqueVotante}})
  votantes: Votante[];

  @hasMany(() => Cargo, {through: {model: () => BloqueCargo}})
  cargos: Cargo[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
