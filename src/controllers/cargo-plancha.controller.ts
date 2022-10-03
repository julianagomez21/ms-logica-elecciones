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
  Plancha,
} from '../models';
import {CargoRepository} from '../repositories';

export class CargoPlanchaController {
  constructor(
    @repository(CargoRepository) protected cargoRepository: CargoRepository,
  ) { }

  @get('/cargos/{id}/planchas', {
    responses: {
      '200': {
        description: 'Array of Cargo has many Plancha',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plancha)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plancha>,
  ): Promise<Plancha[]> {
    return this.cargoRepository.planchas(id).find(filter);
  }

  @post('/cargos/{id}/planchas', {
    responses: {
      '200': {
        description: 'Cargo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plancha)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cargo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plancha, {
            title: 'NewPlanchaInCargo',
            exclude: ['id'],
            optional: ['cargoId']
          }),
        },
      },
    }) plancha: Omit<Plancha, 'id'>,
  ): Promise<Plancha> {
    return this.cargoRepository.planchas(id).create(plancha);
  }

  @patch('/cargos/{id}/planchas', {
    responses: {
      '200': {
        description: 'Cargo.Plancha PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plancha, {partial: true}),
        },
      },
    })
    plancha: Partial<Plancha>,
    @param.query.object('where', getWhereSchemaFor(Plancha)) where?: Where<Plancha>,
  ): Promise<Count> {
    return this.cargoRepository.planchas(id).patch(plancha, where);
  }

  @del('/cargos/{id}/planchas', {
    responses: {
      '200': {
        description: 'Cargo.Plancha DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plancha)) where?: Where<Plancha>,
  ): Promise<Count> {
    return this.cargoRepository.planchas(id).delete(where);
  }
}
