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
import {BloqueVotante} from '../models';
import {BloqueVotanteRepository} from '../repositories';

export class BloqueVotanteController {
  constructor(
    @repository(BloqueVotanteRepository)
    public bloqueVotanteRepository : BloqueVotanteRepository,
  ) {}

  @post('/bloque-votantes')
  @response(200, {
    description: 'BloqueVotante model instance',
    content: {'application/json': {schema: getModelSchemaRef(BloqueVotante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueVotante, {
            title: 'NewBloqueVotante',
            exclude: ['id'],
          }),
        },
      },
    })
    bloqueVotante: Omit<BloqueVotante, 'id'>,
  ): Promise<BloqueVotante> {
    return this.bloqueVotanteRepository.create(bloqueVotante);
  }

  @get('/bloque-votantes/count')
  @response(200, {
    description: 'BloqueVotante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BloqueVotante) where?: Where<BloqueVotante>,
  ): Promise<Count> {
    return this.bloqueVotanteRepository.count(where);
  }

  @get('/bloque-votantes')
  @response(200, {
    description: 'Array of BloqueVotante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BloqueVotante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BloqueVotante) filter?: Filter<BloqueVotante>,
  ): Promise<BloqueVotante[]> {
    return this.bloqueVotanteRepository.find(filter);
  }

  @patch('/bloque-votantes')
  @response(200, {
    description: 'BloqueVotante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueVotante, {partial: true}),
        },
      },
    })
    bloqueVotante: BloqueVotante,
    @param.where(BloqueVotante) where?: Where<BloqueVotante>,
  ): Promise<Count> {
    return this.bloqueVotanteRepository.updateAll(bloqueVotante, where);
  }

  @get('/bloque-votantes/{id}')
  @response(200, {
    description: 'BloqueVotante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BloqueVotante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BloqueVotante, {exclude: 'where'}) filter?: FilterExcludingWhere<BloqueVotante>
  ): Promise<BloqueVotante> {
    return this.bloqueVotanteRepository.findById(id, filter);
  }

  @patch('/bloque-votantes/{id}')
  @response(204, {
    description: 'BloqueVotante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueVotante, {partial: true}),
        },
      },
    })
    bloqueVotante: BloqueVotante,
  ): Promise<void> {
    await this.bloqueVotanteRepository.updateById(id, bloqueVotante);
  }

  @put('/bloque-votantes/{id}')
  @response(204, {
    description: 'BloqueVotante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bloqueVotante: BloqueVotante,
  ): Promise<void> {
    await this.bloqueVotanteRepository.replaceById(id, bloqueVotante);
  }

  @del('/bloque-votantes/{id}')
  @response(204, {
    description: 'BloqueVotante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bloqueVotanteRepository.deleteById(id);
  }
}
