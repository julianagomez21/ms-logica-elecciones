import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cargo,
  Eleccion,
} from '../models';
import {CargoRepository} from '../repositories';

export class CargoEleccionController {
  constructor(
    @repository(CargoRepository)
    public cargoRepository: CargoRepository,
  ) { }

  @get('/cargos/{id}/eleccion', {
    responses: {
      '200': {
        description: 'Eleccion belonging to Cargo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Eleccion)},
          },
        },
      },
    },
  })
  async getEleccion(
    @param.path.number('id') id: typeof Cargo.prototype.id,
  ): Promise<Eleccion> {
    return this.cargoRepository.eleccion(id);
  }
}
