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
import {Plancha} from '../models';
import {PlanchaRepository} from '../repositories';

export class PlanchaController {
  constructor(
    @repository(PlanchaRepository)
    public planchaRepository : PlanchaRepository,
  ) {}

  @post('/plancha')
  @response(200, {
    description: 'Plancha model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plancha)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plancha, {
            title: 'NewPlancha',
            exclude: ['id'],
          }),
        },
      },
    })
    plancha: Omit<Plancha, 'id'>,
  ): Promise<Plancha> {
    return this.planchaRepository.create(plancha);
  }

  @get('/plancha/count')
  @response(200, {
    description: 'Plancha model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plancha) where?: Where<Plancha>,
  ): Promise<Count> {
    return this.planchaRepository.count(where);
  }

  @get('/plancha')
  @response(200, {
    description: 'Array of Plancha model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plancha, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plancha) filter?: Filter<Plancha>,
  ): Promise<Plancha[]> {
    return this.planchaRepository.find(filter);
  }

  @patch('/plancha')
  @response(200, {
    description: 'Plancha PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plancha, {partial: true}),
        },
      },
    })
    plancha: Plancha,
    @param.where(Plancha) where?: Where<Plancha>,
  ): Promise<Count> {
    return this.planchaRepository.updateAll(plancha, where);
  }

  @get('/plancha/{id}')
  @response(200, {
    description: 'Plancha model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plancha, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Plancha, {exclude: 'where'}) filter?: FilterExcludingWhere<Plancha>
  ): Promise<Plancha> {
    return this.planchaRepository.findById(id, filter);
  }

  @patch('/plancha/{id}')
  @response(204, {
    description: 'Plancha PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plancha, {partial: true}),
        },
      },
    })
    plancha: Plancha,
  ): Promise<void> {
    await this.planchaRepository.updateById(id, plancha);
  }

  @put('/plancha/{id}')
  @response(204, {
    description: 'Plancha PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() plancha: Plancha,
  ): Promise<void> {
    await this.planchaRepository.replaceById(id, plancha);
  }

  @del('/plancha/{id}')
  @response(204, {
    description: 'Plancha DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planchaRepository.deleteById(id);
  }
}
