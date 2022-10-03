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
import {Eleccion} from '../models';
import {EleccionRepository} from '../repositories';

export class EleccionController {
  constructor(
    @repository(EleccionRepository)
    public eleccionRepository : EleccionRepository,
  ) {}

  @post('/eleccion')
  @response(200, {
    description: 'Eleccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Eleccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eleccion, {
            title: 'NewEleccion',
            exclude: ['id'],
          }),
        },
      },
    })
    eleccion: Omit<Eleccion, 'id'>,
  ): Promise<Eleccion> {
    return this.eleccionRepository.create(eleccion);
  }

  @get('/eleccion/count')
  @response(200, {
    description: 'Eleccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Eleccion) where?: Where<Eleccion>,
  ): Promise<Count> {
    return this.eleccionRepository.count(where);
  }

  @get('/eleccion')
  @response(200, {
    description: 'Array of Eleccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Eleccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Eleccion) filter?: Filter<Eleccion>,
  ): Promise<Eleccion[]> {
    return this.eleccionRepository.find(filter);
  }

  @patch('/eleccion')
  @response(200, {
    description: 'Eleccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eleccion, {partial: true}),
        },
      },
    })
    eleccion: Eleccion,
    @param.where(Eleccion) where?: Where<Eleccion>,
  ): Promise<Count> {
    return this.eleccionRepository.updateAll(eleccion, where);
  }

  @get('/eleccion/{id}')
  @response(200, {
    description: 'Eleccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Eleccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Eleccion, {exclude: 'where'}) filter?: FilterExcludingWhere<Eleccion>
  ): Promise<Eleccion> {
    return this.eleccionRepository.findById(id, filter);
  }

  @patch('/eleccion/{id}')
  @response(204, {
    description: 'Eleccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Eleccion, {partial: true}),
        },
      },
    })
    eleccion: Eleccion,
  ): Promise<void> {
    await this.eleccionRepository.updateById(id, eleccion);
  }

  @put('/eleccion/{id}')
  @response(204, {
    description: 'Eleccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eleccion: Eleccion,
  ): Promise<void> {
    await this.eleccionRepository.replaceById(id, eleccion);
  }

  @del('/eleccion/{id}')
  @response(204, {
    description: 'Eleccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eleccionRepository.deleteById(id);
  }
}
