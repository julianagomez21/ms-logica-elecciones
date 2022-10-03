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
import {Voto} from '../models';
import {VotoRepository} from '../repositories';

export class VotoController {
  constructor(
    @repository(VotoRepository)
    public votoRepository : VotoRepository,
  ) {}

  @post('/voto')
  @response(200, {
    description: 'Voto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Voto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voto, {
            title: 'NewVoto',
            exclude: ['id'],
          }),
        },
      },
    })
    voto: Omit<Voto, 'id'>,
  ): Promise<Voto> {
    return this.votoRepository.create(voto);
  }

  @get('/voto/count')
  @response(200, {
    description: 'Voto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Voto) where?: Where<Voto>,
  ): Promise<Count> {
    return this.votoRepository.count(where);
  }

  @get('/voto')
  @response(200, {
    description: 'Array of Voto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Voto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Voto) filter?: Filter<Voto>,
  ): Promise<Voto[]> {
    return this.votoRepository.find(filter);
  }

  @patch('/voto')
  @response(200, {
    description: 'Voto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voto, {partial: true}),
        },
      },
    })
    voto: Voto,
    @param.where(Voto) where?: Where<Voto>,
  ): Promise<Count> {
    return this.votoRepository.updateAll(voto, where);
  }

  @get('/voto/{id}')
  @response(200, {
    description: 'Voto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Voto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Voto, {exclude: 'where'}) filter?: FilterExcludingWhere<Voto>
  ): Promise<Voto> {
    return this.votoRepository.findById(id, filter);
  }

  @patch('/voto/{id}')
  @response(204, {
    description: 'Voto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voto, {partial: true}),
        },
      },
    })
    voto: Voto,
  ): Promise<void> {
    await this.votoRepository.updateById(id, voto);
  }

  @put('/voto/{id}')
  @response(204, {
    description: 'Voto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() voto: Voto,
  ): Promise<void> {
    await this.votoRepository.replaceById(id, voto);
  }

  @del('/voto/{id}')
  @response(204, {
    description: 'Voto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.votoRepository.deleteById(id);
  }
}
