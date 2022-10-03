import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Candidato,
  Plancha,
} from '../models';
import {CandidatoRepository} from '../repositories';

export class CandidatoPlanchaController {
  constructor(
    @repository(CandidatoRepository)
    public candidatoRepository: CandidatoRepository,
  ) { }

  @get('/candidatoes/{id}/plancha', {
    responses: {
      '200': {
        description: 'Plancha belonging to Candidato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plancha)},
          },
        },
      },
    },
  })
  async getPlancha(
    @param.path.number('id') id: typeof Candidato.prototype.id,
  ): Promise<Plancha> {
    return this.candidatoRepository.plancha(id);
  }
}
