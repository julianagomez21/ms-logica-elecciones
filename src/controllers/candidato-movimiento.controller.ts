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
  Movimiento,
} from '../models';
import {CandidatoRepository} from '../repositories';

export class CandidatoMovimientoController {
  constructor(
    @repository(CandidatoRepository)
    public candidatoRepository: CandidatoRepository,
  ) { }

  @get('/candidatoes/{id}/movimiento', {
    responses: {
      '200': {
        description: 'Movimiento belonging to Candidato',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movimiento)},
          },
        },
      },
    },
  })
  async getMovimiento(
    @param.path.number('id') id: typeof Candidato.prototype.id,
  ): Promise<Movimiento> {
    return this.candidatoRepository.movimiento(id);
  }
}
