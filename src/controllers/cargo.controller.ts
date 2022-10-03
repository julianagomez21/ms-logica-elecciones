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
import {Cargo} from '../models';
import {CargoRepository} from '../repositories';

export class CargoController {
  constructor(
    @repository(CargoRepository)
    public cargoRepository : CargoRepository,
  ) {}

  @post('/cargo')
  @response(200, {
    description: 'Cargo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cargo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {
            title: 'NewCargo',
            exclude: ['id'],
          }),
        },
      },
    })
    cargo: Omit<Cargo, 'id'>,
  ): Promise<Cargo> {
    return this.cargoRepository.create(cargo);
  }

  @get('/cargo/count')
  @response(200, {
    description: 'Cargo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cargo) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.cargoRepository.count(where);
  }

  @get('/cargo')
  @response(200, {
    description: 'Array of Cargo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cargo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cargo) filter?: Filter<Cargo>,
  ): Promise<Cargo[]> {
    return this.cargoRepository.find(filter);
  }

  @patch('/cargo')
  @response(200, {
    description: 'Cargo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Cargo,
    @param.where(Cargo) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.cargoRepository.updateAll(cargo, where);
  }

  @get('/cargo/{id}')
  @response(200, {
    description: 'Cargo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cargo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cargo, {exclude: 'where'}) filter?: FilterExcludingWhere<Cargo>
  ): Promise<Cargo> {
    return this.cargoRepository.findById(id, filter);
  }

  @patch('/cargo/{id}')
  @response(204, {
    description: 'Cargo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Cargo,
  ): Promise<void> {
    await this.cargoRepository.updateById(id, cargo);
  }

  @put('/cargo/{id}')
  @response(204, {
    description: 'Cargo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cargo: Cargo,
  ): Promise<void> {
    await this.cargoRepository.replaceById(id, cargo);
  }

  @del('/cargo/{id}')
  @response(204, {
    description: 'Cargo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cargoRepository.deleteById(id);
  }
}
