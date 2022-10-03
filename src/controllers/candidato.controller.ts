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
import {Candidato} from '../models';
import {CandidatoRepository} from '../repositories';

export class CandidatoController {
  constructor(
    @repository(CandidatoRepository)
    public candidatoRepository : CandidatoRepository,
  ) {}

  @post('/candidato')
  @response(200, {
    description: 'Candidato model instance',
    content: {'application/json': {schema: getModelSchemaRef(Candidato)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {
            title: 'NewCandidato',
            exclude: ['id'],
          }),
        },
      },
    })
    candidato: Omit<Candidato, 'id'>,
  ): Promise<Candidato> {
    return this.candidatoRepository.create(candidato);
  }

  @get('/candidato/count')
  @response(200, {
    description: 'Candidato model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Candidato) where?: Where<Candidato>,
  ): Promise<Count> {
    return this.candidatoRepository.count(where);
  }

  @get('/candidato')
  @response(200, {
    description: 'Array of Candidato model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Candidato, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Candidato) filter?: Filter<Candidato>,
  ): Promise<Candidato[]> {
    return this.candidatoRepository.find(filter);
  }

  @patch('/candidato')
  @response(200, {
    description: 'Candidato PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {partial: true}),
        },
      },
    })
    candidato: Candidato,
    @param.where(Candidato) where?: Where<Candidato>,
  ): Promise<Count> {
    return this.candidatoRepository.updateAll(candidato, where);
  }

  @get('/candidato/{id}')
  @response(200, {
    description: 'Candidato model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Candidato, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Candidato, {exclude: 'where'}) filter?: FilterExcludingWhere<Candidato>
  ): Promise<Candidato> {
    return this.candidatoRepository.findById(id, filter);
  }

  @patch('/candidato/{id}')
  @response(204, {
    description: 'Candidato PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidato, {partial: true}),
        },
      },
    })
    candidato: Candidato,
  ): Promise<void> {
    await this.candidatoRepository.updateById(id, candidato);
  }

  @put('/candidato/{id}')
  @response(204, {
    description: 'Candidato PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() candidato: Candidato,
  ): Promise<void> {
    await this.candidatoRepository.replaceById(id, candidato);
  }

  @del('/candidato/{id}')
  @response(204, {
    description: 'Candidato DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.candidatoRepository.deleteById(id);
  }
}
