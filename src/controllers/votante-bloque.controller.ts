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
Votante,
BloqueVotante,
Bloque,
} from '../models';
import {VotanteRepository} from '../repositories';

export class VotanteBloqueController {
  constructor(
    @repository(VotanteRepository) protected votanteRepository: VotanteRepository,
  ) { }

  @get('/votantes/{id}/bloques', {
    responses: {
      '200': {
        description: 'Array of Votante has many Bloque through BloqueVotante',
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
    return this.votanteRepository.bloques(id).find(filter);
  }

  @post('/votantes/{id}/bloques', {
    responses: {
      '200': {
        description: 'create a Bloque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Votante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {
            title: 'NewBloqueInVotante',
            exclude: ['id'],
          }),
        },
      },
    }) bloque: Omit<Bloque, 'id'>,
  ): Promise<Bloque> {
    return this.votanteRepository.bloques(id).create(bloque);
  }

  @patch('/votantes/{id}/bloques', {
    responses: {
      '200': {
        description: 'Votante.Bloque PATCH success count',
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
    return this.votanteRepository.bloques(id).patch(bloque, where);
  }

  @del('/votantes/{id}/bloques', {
    responses: {
      '200': {
        description: 'Votante.Bloque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.votanteRepository.bloques(id).delete(where);
  }
}
