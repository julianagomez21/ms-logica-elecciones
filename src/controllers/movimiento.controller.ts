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
import {Movimiento} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoController {
  constructor(
    @repository(MovimientoRepository)
    public movimientoRepository : MovimientoRepository,
  ) {}

  @post('/movimiento')
  @response(200, {
    description: 'Movimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {
            title: 'NewMovimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    movimiento: Omit<Movimiento, 'id'>,
  ): Promise<Movimiento> {
    return this.movimientoRepository.create(movimiento);
  }

  @get('/movimiento/count')
  @response(200, {
    description: 'Movimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Movimiento) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.movimientoRepository.count(where);
  }

  @get('/movimiento')
  @response(200, {
    description: 'Array of Movimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Movimiento) filter?: Filter<Movimiento>,
  ): Promise<Movimiento[]> {
    return this.movimientoRepository.find(filter);
  }

  @patch('/movimiento')
  @response(200, {
    description: 'Movimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {partial: true}),
        },
      },
    })
    movimiento: Movimiento,
    @param.where(Movimiento) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.movimientoRepository.updateAll(movimiento, where);
  }

  @get('/movimiento/{id}')
  @response(200, {
    description: 'Movimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Movimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Movimiento>
  ): Promise<Movimiento> {
    return this.movimientoRepository.findById(id, filter);
  }

  @patch('/movimiento/{id}')
  @response(204, {
    description: 'Movimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {partial: true}),
        },
      },
    })
    movimiento: Movimiento,
  ): Promise<void> {
    await this.movimientoRepository.updateById(id, movimiento);
  }

  @put('/movimiento/{id}')
  @response(204, {
    description: 'Movimiento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() movimiento: Movimiento,
  ): Promise<void> {
    await this.movimientoRepository.replaceById(id, movimiento);
  }

  @del('/movimiento/{id}')
  @response(204, {
    description: 'Movimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.movimientoRepository.deleteById(id);
  }
}
