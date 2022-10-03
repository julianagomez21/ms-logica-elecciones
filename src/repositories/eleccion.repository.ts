import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Eleccion, EleccionRelations, Cargo} from '../models';
import {CargoRepository} from './cargo.repository';

export class EleccionRepository extends DefaultCrudRepository<
  Eleccion,
  typeof Eleccion.prototype.id,
  EleccionRelations
> {

  public readonly cargos: HasManyRepositoryFactory<Cargo, typeof Eleccion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CargoRepository') protected cargoRepositoryGetter: Getter<CargoRepository>,
  ) {
    super(Eleccion, dataSource);
    this.cargos = this.createHasManyRepositoryFactoryFor('cargos', cargoRepositoryGetter,);
    this.registerInclusionResolver('cargos', this.cargos.inclusionResolver);
  }
}
