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
  Plancha,
  Candidato,
} from '../models';
import {PlanchaRepository} from '../repositories';

export class PlanchaCandidatoController {
  constructor(
    @repository(PlanchaRepository) protected planchaRepository: PlanchaRepository,
  ) { }

  @get('/planchas/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Array of Plancha has many Candidato',
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
    return this.planchaRepository.candidatos(id).find(filter);
  }

  @post('/planchas/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Plancha model instance',
        content: {'application/json': {schema: getModelSchemaRef(Candidato)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plancha.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {
            title: 'NewCandidatoInPlancha',
            exclude: ['id'],
            optional: ['planchaId']
          }),
        },
      },
    }) candidato: Omit<Candidato, 'id'>,
  ): Promise<Candidato> {
    return this.planchaRepository.candidatos(id).create(candidato);
  }

  @patch('/planchas/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Plancha.Candidato PATCH success count',
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
    return this.planchaRepository.candidatos(id).patch(candidato, where);
  }

  @del('/planchas/{id}/candidatoes', {
    responses: {
      '200': {
        description: 'Plancha.Candidato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Candidato)) where?: Where<Candidato>,
  ): Promise<Count> {
    return this.planchaRepository.candidatos(id).delete(where);
  }
}
