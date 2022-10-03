import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bloque, BloqueRelations, Votante, BloqueVotante, Cargo, BloqueCargo} from '../models';
import {BloqueVotanteRepository} from './bloque-votante.repository';
import {VotanteRepository} from './votante.repository';
import {BloqueCargoRepository} from './bloque-cargo.repository';
import {CargoRepository} from './cargo.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.id,
  BloqueRelations
> {

  public readonly votantes: HasManyThroughRepositoryFactory<Votante, typeof Votante.prototype.id,
          BloqueVotante,
          typeof Bloque.prototype.id
        >;

  public readonly cargos: HasManyThroughRepositoryFactory<Cargo, typeof Cargo.prototype.id,
          BloqueCargo,
          typeof Bloque.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BloqueVotanteRepository') protected bloqueVotanteRepositoryGetter: Getter<BloqueVotanteRepository>, @repository.getter('VotanteRepository') protected votanteRepositoryGetter: Getter<VotanteRepository>, @repository.getter('BloqueCargoRepository') protected bloqueCargoRepositoryGetter: Getter<BloqueCargoRepository>, @repository.getter('CargoRepository') protected cargoRepositoryGetter: Getter<CargoRepository>,
  ) {
    super(Bloque, dataSource);
    this.cargos = this.createHasManyThroughRepositoryFactoryFor('cargos', cargoRepositoryGetter, bloqueCargoRepositoryGetter,);
    this.registerInclusionResolver('cargos', this.cargos.inclusionResolver);
    this.votantes = this.createHasManyThroughRepositoryFactoryFor('votantes', votanteRepositoryGetter, bloqueVotanteRepositoryGetter,);
    this.registerInclusionResolver('votantes', this.votantes.inclusionResolver);
  }
}
