import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Movimiento,
  Candidato,
} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoCandidatoController {
  constructor(
    @repository(MovimientoRepository) protected movimientoRepository: MovimientoRepository,
  ) { }

  @get('/movimientos/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Array of Movimiento has many Candidato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Candidato)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Candidato>,
  ): Promise<Candidato[]> {
    return this.movimientoRepository.candidatos(id).find(filter);
  }

  @post('/movimientos/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Movimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Candidato)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Movimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {
            title: 'NewCandidatoInMovimiento',
            exclude: ['id'],
            optional: ['movimientoId']
          }),
        },
      },
    }) candidato: Omit<Candidato, 'id'>,
  ): Promise<Candidato> {
    return this.movimientoRepository.candidatos(id).create(candidato);
  }

  @patch('/movimientos/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Movimiento.Candidato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {partial: true}),
        },
      },
    })
    candidato: Partial<Candidato>,
    @param.query.object('where', getWhereSchemaFor(Candidato)) where?: Where<Candidato>,
  ): Promise<Count> {
    return this.movimientoRepository.candidatos(id).patch(candidato, where);
  }

  @del('/movimientos/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Movimiento.Candidato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Candidato)) where?: Where<Candidato>,
  ): Promise<Count> {
    return this.movimientoRepository.candidatos(id).delete(where);
  }
}
