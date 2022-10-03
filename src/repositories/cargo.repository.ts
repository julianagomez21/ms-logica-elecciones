import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cargo, CargoRelations, Plancha, Eleccion, Bloque, BloqueCargo} from '../models';
import {PlanchaRepository} from './plancha.repository';
import {EleccionRepository} from './eleccion.repository';
import {BloqueCargoRepository} from './bloque-cargo.repository';
import {BloqueRepository} from './bloque.repository';

export class CargoRepository extends DefaultCrudRepository<
  Cargo,
  typeof Cargo.prototype.id,
  CargoRelations
> {

  public readonly planchas: HasManyRepositoryFactory<Plancha, typeof Cargo.prototype.id>;

  public readonly eleccion: BelongsToAccessor<Eleccion, typeof Cargo.prototype.id>;

  public readonly bloques: HasManyThroughRepositoryFactory<Bloque, typeof Bloque.prototype.id,
          BloqueCargo,
          typeof Cargo.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanchaRepository') protected planchaRepositoryGetter: Getter<PlanchaRepository>, @repository.getter('EleccionRepository') protected eleccionRepositoryGetter: Getter<EleccionRepository>, @repository.getter('BloqueCargoRepository') protected bloqueCargoRepositoryGetter: Getter<BloqueCargoRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Cargo, dataSource);
    this.bloques = this.createHasManyThroughRepositoryFactoryFor('bloques', bloqueRepositoryGetter, bloqueCargoRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
    this.eleccion = this.createBelongsToAccessorFor('eleccion', eleccionRepositoryGetter,);
    this.registerInclusionResolver('eleccion', this.eleccion.inclusionResolver);
    this.planchas = this.createHasManyRepositoryFactoryFor('planchas', planchaRepositoryGetter,);
    this.registerInclusionResolver('planchas', this.planchas.inclusionResolver);
  }
}
