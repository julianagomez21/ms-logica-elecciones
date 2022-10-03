import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Voto,
  Plancha,
} from '../models';
import {VotoRepository} from '../repositories';

export class VotoPlanchaController {
  constructor(
    @repository(VotoRepository)
    public votoRepository: VotoRepository,
  ) { }

  @get('/votos/{id}/plancha', {
    responses: {
      '200': {
        description: 'Plancha belonging to Voto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plancha)},
          },
        },
      },
    },
  })
  async getPlancha(
    @param.path.number('id') id: typeof Voto.prototype.id,
  ): Promise<Plancha> {
    return this.votoRepository.plancha(id);
  }
}
