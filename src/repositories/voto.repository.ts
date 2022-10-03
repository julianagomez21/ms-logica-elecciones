import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Voto, VotoRelations, Plancha} from '../models';
import {PlanchaRepository} from './plancha.repository';

export class VotoRepository extends DefaultCrudRepository<
  Voto,
  typeof Voto.prototype.id,
  VotoRelations
> {

  public readonly plancha: BelongsToAccessor<Plancha, typeof Voto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanchaRepository') protected planchaRepositoryGetter: Getter<PlanchaRepository>,
  ) {
    super(Voto, dataSource);
    this.plancha = this.createBelongsToAccessorFor('plancha', planchaRepositoryGetter,);
    this.registerInclusionResolver('plancha', this.plancha.inclusionResolver);
  }
}
