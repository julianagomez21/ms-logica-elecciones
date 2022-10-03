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
  Voto,
} from '../models';
import {PlanchaRepository} from '../repositories';

export class PlanchaVotoController {
  constructor(
    @repository(PlanchaRepository) protected planchaRepository: PlanchaRepository,
  ) { }

  @get('/planchas/{id}/votos', {
    responses: {
      '200': {
        description: 'Array of Plancha has many Voto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Voto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Voto>,
  ): Promise<Voto[]> {
    return this.planchaRepository.votos(id).find(filter);
  }

  @post('/planchas/{id}/votos', {
    responses: {
      '200': {
        description: 'Plancha model instance',
        content: {'application/json': {schema: getModelSchemaRef(Voto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plancha.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voto, {
            title: 'NewVotoInPlancha',
            exclude: ['id'],
            optional: ['planchaId']
          }),
        },
      },
    }) voto: Omit<Voto, 'id'>,
  ): Promise<Voto> {
    return this.planchaRepository.votos(id).create(voto);
  }

  @patch('/planchas/{id}/votos', {
    responses: {
      '200': {
        description: 'Plancha.Voto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voto, {partial: true}),
        },
      },
    })
    voto: Partial<Voto>,
    @param.query.object('where', getWhereSchemaFor(Voto)) where?: Where<Voto>,
  ): Promise<Count> {
    return this.planchaRepository.votos(id).patch(voto, where);
  }

  @del('/planchas/{id}/votos', {
    responses: {
      '200': {
        description: 'Plancha.Voto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Voto)) where?: Where<Voto>,
  ): Promise<Count> {
    return this.planchaRepository.votos(id).delete(where);
  }
}
