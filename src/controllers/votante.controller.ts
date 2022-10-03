import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Votante} from '../models';
import {VotanteRepository} from '../repositories';

export class VotanteController {
  constructor(
    @repository(VotanteRepository)
    public votanteRepository : VotanteRepository,
  ) {}

  @post('/votante')
  @response(200, {
    description: 'Votante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Votante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {
            title: 'NewVotante',
            exclude: ['id'],
          }),
        },
      },
    })
    votante: Omit<Votante, 'id'>,
  ): Promise<Votante> {
    return this.votanteRepository.create(votante);
  }

  @get('/votante/count')
  @response(200, {
    description: 'Votante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Votante) where?: Where<Votante>,
  ): Promise<Count> {
    return this.votanteRepository.count(where);
  }

  @get('/votante')
  @response(200, {
    description: 'Array of Votante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Votante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Votante) filter?: Filter<Votante>,
  ): Promise<Votante[]> {
    return this.votanteRepository.find(filter);
  }

  @patch('/votante')
  @response(200, {
    description: 'Votante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {partial: true}),
        },
      },
    })
    votante: Votante,
    @param.where(Votante) where?: Where<Votante>,
  ): Promise<Count> {
    return this.votanteRepository.updateAll(votante, where);
  }

  @get('/votante/{id}')
  @response(200, {
    description: 'Votante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Votante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Votante, {exclude: 'where'}) filter?: FilterExcludingWhere<Votante>
  ): Promise<Votante> {
    return this.votanteRepository.findById(id, filter);
  }

  @patch('/votante/{id}')
  @response(204, {
    description: 'Votante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {partial: true}),
        },
      },
    })
    votante: Votante,
  ): Promise<void> {
    await this.votanteRepository.updateById(id, votante);
  }

  @put('/votante/{id}')
  @response(204, {
    description: 'Votante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() votante: Votante,
  ): Promise<void> {
    await this.votanteRepository.replaceById(id, votante);
  }

  @del('/votante/{id}')
  @response(204, {
    description: 'Votante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.votanteRepository.deleteById(id);
  }
}
