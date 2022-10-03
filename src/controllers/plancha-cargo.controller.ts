import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plancha,
  Cargo,
} from '../models';
import {PlanchaRepository} from '../repositories';

export class PlanchaCargoController {
  constructor(
    @repository(PlanchaRepository)
    public planchaRepository: PlanchaRepository,
  ) { }

  @get('/planchas/{id}/cargo', {
    responses: {
      '200': {
        description: 'Cargo belonging to Plancha',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cargo)},
          },
        },
      },
    },
  })
  async getCargo(
    @param.path.number('id') id: typeof Plancha.prototype.id,
  ): Promise<Cargo> {
    return this.planchaRepository.cargo(id);
  }
}
