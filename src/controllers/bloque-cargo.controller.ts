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
import {BloqueCargo} from '../models';
import {BloqueCargoRepository} from '../repositories';

export class BloqueCargoController {
  constructor(
    @repository(BloqueCargoRepository)
    public bloqueCargoRepository : BloqueCargoRepository,
  ) {}

  @post('/bloque-cargo')
  @response(200, {
    description: 'BloqueCargo model instance',
    content: {'application/json': {schema: getModelSchemaRef(BloqueCargo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueCargo, {
            title: 'NewBloqueCargo',
            exclude: ['id'],
          }),
        },
      },
    })
    bloqueCargo: Omit<BloqueCargo, 'id'>,
  ): Promise<BloqueCargo> {
    return this.bloqueCargoRepository.create(bloqueCargo);
  }

  @get('/bloque-cargo/count')
  @response(200, {
    description: 'BloqueCargo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BloqueCargo) where?: Where<BloqueCargo>,
  ): Promise<Count> {
    return this.bloqueCargoRepository.count(where);
  }

  @get('/bloque-cargo')
  @response(200, {
    description: 'Array of BloqueCargo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BloqueCargo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BloqueCargo) filter?: Filter<BloqueCargo>,
  ): Promise<BloqueCargo[]> {
    return this.bloqueCargoRepository.find(filter);
  }

  @patch('/bloque-cargo')
  @response(200, {
    description: 'BloqueCargo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueCargo, {partial: true}),
        },
      },
    })
    bloqueCargo: BloqueCargo,
    @param.where(BloqueCargo) where?: Where<BloqueCargo>,
  ): Promise<Count> {
    return this.bloqueCargoRepository.updateAll(bloqueCargo, where);
  }

  @get('/bloque-cargo/{id}')
  @response(200, {
    description: 'BloqueCargo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BloqueCargo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BloqueCargo, {exclude: 'where'}) filter?: FilterExcludingWhere<BloqueCargo>
  ): Promise<BloqueCargo> {
    return this.bloqueCargoRepository.findById(id, filter);
  }

  @patch('/bloque-cargo/{id}')
  @response(204, {
    description: 'BloqueCargo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BloqueCargo, {partial: true}),
        },
      },
    })
    bloqueCargo: BloqueCargo,
  ): Promise<void> {
    await this.bloqueCargoRepository.updateById(id, bloqueCargo);
  }

  @put('/bloque-cargo/{id}')
  @response(204, {
    description: 'BloqueCargo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bloqueCargo: BloqueCargo,
  ): Promise<void> {
    await this.bloqueCargoRepository.replaceById(id, bloqueCargo);
  }

  @del('/bloque-cargo/{id}')
  @response(204, {
    description: 'BloqueCargo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bloqueCargoRepository.deleteById(id);
  }
}
