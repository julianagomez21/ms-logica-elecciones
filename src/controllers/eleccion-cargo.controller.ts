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
  Eleccion,
  Cargo,
} from '../models';
import {EleccionRepository} from '../repositories';

export class EleccionCargoController {
  constructor(
    @repository(EleccionRepository) protected eleccionRepository: EleccionRepository,
  ) { }

  @get('/eleccions/{id}/cargos', {
    responses: {
      '200': {
        description: 'Array of Eleccion has many Cargo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cargo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cargo>,
  ): Promise<Cargo[]> {
    return this.eleccionRepository.cargos(id).find(filter);
  }

  @post('/eleccions/{id}/cargos', {
    responses: {
      '200': {
        description: 'Eleccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cargo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Eleccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {
            title: 'NewCargoInEleccion',
            exclude: ['id'],
            optional: ['eleccionId']
          }),
        },
      },
    }) cargo: Omit<Cargo, 'id'>,
  ): Promise<Cargo> {
    return this.eleccionRepository.cargos(id).create(cargo);
  }

  @patch('/eleccions/{id}/cargos', {
    responses: {
      '200': {
        description: 'Eleccion.Cargo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Partial<Cargo>,
    @param.query.object('where', getWhereSchemaFor(Cargo)) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.eleccionRepository.cargos(id).patch(cargo, where);
  }

  @del('/eleccions/{id}/cargos', {
    responses: {
      '200': {
        description: 'Eleccion.Cargo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cargo)) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.eleccionRepository.cargos(id).delete(where);
  }
}
