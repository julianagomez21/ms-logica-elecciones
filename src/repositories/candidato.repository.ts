import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Candidato, CandidatoRelations, Movimiento, Plancha} from '../models';
import {MovimientoRepository} from './movimiento.repository';
import {PlanchaRepository} from './plancha.repository';

export class CandidatoRepository extends DefaultCrudRepository<
  Candidato,
  typeof Candidato.prototype.id,
  CandidatoRelations
> {

  public readonly movimiento: BelongsToAccessor<Movimiento, typeof Candidato.prototype.id>;

  public readonly plancha: BelongsToAccessor<Plancha, typeof Candidato.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>, @repository.getter('PlanchaRepository') protected planchaRepositoryGetter: Getter<PlanchaRepository>,
  ) {
    super(Candidato, dataSource);
    this.plancha = this.createBelongsToAccessorFor('plancha', planchaRepositoryGetter,);
    this.registerInclusionResolver('plancha', this.plancha.inclusionResolver);
    this.movimiento = this.createBelongsToAccessorFor('movimiento', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimiento', this.movimiento.inclusionResolver);
  }
}
