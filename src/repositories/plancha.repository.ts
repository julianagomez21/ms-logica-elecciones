import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plancha, PlanchaRelations, Candidato, Voto, Cargo} from '../models';
import {CandidatoRepository} from './candidato.repository';
import {VotoRepository} from './voto.repository';
import {CargoRepository} from './cargo.repository';

export class PlanchaRepository extends DefaultCrudRepository<
  Plancha,
  typeof Plancha.prototype.id,
  PlanchaRelations
> {

  public readonly candidatos: HasManyRepositoryFactory<Candidato, typeof Plancha.prototype.id>;

  public readonly votos: HasManyRepositoryFactory<Voto, typeof Plancha.prototype.id>;

  public readonly cargo: BelongsToAccessor<Cargo, typeof Plancha.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CandidatoRepository') protected candidatoRepositoryGetter: Getter<CandidatoRepository>, @repository.getter('VotoRepository') protected votoRepositoryGetter: Getter<VotoRepository>, @repository.getter('CargoRepository') protected cargoRepositoryGetter: Getter<CargoRepository>,
  ) {
    super(Plancha, dataSource);
    this.cargo = this.createBelongsToAccessorFor('cargo', cargoRepositoryGetter,);
    this.registerInclusionResolver('cargo', this.cargo.inclusionResolver);
    this.votos = this.createHasManyRepositoryFactoryFor('votos', votoRepositoryGetter,);
    this.registerInclusionResolver('votos', this.votos.inclusionResolver);
    this.candidatos = this.createHasManyRepositoryFactoryFor('candidatos', candidatoRepositoryGetter,);
    this.registerInclusionResolver('candidatos', this.candidatos.inclusionResolver);
  }
}
