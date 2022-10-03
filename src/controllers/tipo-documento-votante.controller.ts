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
  TipoDocumento,
  Votante,
} from '../models';
import {TipoDocumentoRepository} from '../repositories';

export class TipoDocumentoVotanteController {
  constructor(
    @repository(TipoDocumentoRepository) protected tipoDocumentoRepository: TipoDocumentoRepository,
  ) { }

  @get('/tipo-documentos/{id}/votantes', {
    responses: {
      '200': {
        description: 'Array of TipoDocumento has many Votante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Votante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Votante>,
  ): Promise<Votante[]> {
    return this.tipoDocumentoRepository.votantes(id).find(filter);
  }

  @post('/tipo-documentos/{id}/votantes', {
    responses: {
      '200': {
        description: 'TipoDocumento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Votante)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoDocumento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {
            title: 'NewVotanteInTipoDocumento',
            exclude: ['id'],
            optional: ['tipoDocumentoId']
          }),
        },
      },
    }) votante: Omit<Votante, 'id'>,
  ): Promise<Votante> {
    return this.tipoDocumentoRepository.votantes(id).create(votante);
  }

  @patch('/tipo-documentos/{id}/votantes', {
    responses: {
      '200': {
        description: 'TipoDocumento.Votante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votante, {partial: true}),
        },
      },
    })
    votante: Partial<Votante>,
    @param.query.object('where', getWhereSchemaFor(Votante)) where?: Where<Votante>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.votantes(id).patch(votante, where);
  }

  @del('/tipo-documentos/{id}/votantes', {
    responses: {
      '200': {
        description: 'TipoDocumento.Votante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Votante)) where?: Where<Votante>,
  ): Promise<Count> {
    return this.tipoDocumentoRepository.votantes(id).delete(where);
  }
}
