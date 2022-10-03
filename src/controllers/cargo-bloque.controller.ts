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
Cargo,
BloqueCargo,
Bloque,
} from '../models';
import {CargoRepository} from '../repositories';

export class CargoBloqueController {
  constructor(
    @repository(CargoRepository) protected cargoRepository: CargoRepository,
  ) { }

  @get('/cargos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Array of Cargo has many Bloque through BloqueCargo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bloque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bloque>,
  ): Promise<Bloque[]> {
    return this.cargoRepository.bloques(id).find(filter);
  }

  @post('/cargos/{id}/bloques', {
    responses: {
      '200': {
        description: 'create a Bloque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cargo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {
            title: 'NewBloqueInCargo',
            exclude: ['id'],
          }),
        },
      },
    }) bloque: Omit<Bloque, 'id'>,
  ): Promise<Bloque> {
    return this.cargoRepository.bloques(id).create(bloque);
  }

  @patch('/cargos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Cargo.Bloque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {partial: true}),
        },
      },
    })
    bloque: Partial<Bloque>,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.cargoRepository.bloques(id).patch(bloque, where);
  }

  @del('/cargos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Cargo.Bloque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.cargoRepository.bloques(id).delete(where);
  }
}
