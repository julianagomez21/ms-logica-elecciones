import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Votante,
  TipoDocumento,
} from '../models';
import {VotanteRepository} from '../repositories';

export class VotanteTipoDocumentoController {
  constructor(
    @repository(VotanteRepository)
    public votanteRepository: VotanteRepository,
  ) { }

  @get('/votantes/{id}/tipo-documento', {
    responses: {
      '200': {
        description: 'TipoDocumento belonging to Votante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoDocumento)},
          },
        },
      },
    },
  })
  async getTipoDocumento(
    @param.path.number('id') id: typeof Votante.prototype.id,
  ): Promise<TipoDocumento> {
    return this.votanteRepository.tipoDocumento(id);
  }
}
