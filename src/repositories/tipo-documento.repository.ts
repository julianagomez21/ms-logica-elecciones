import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoDocumento, TipoDocumentoRelations, Votante} from '../models';
import {VotanteRepository} from './votante.repository';

export class TipoDocumentoRepository extends DefaultCrudRepository<
  TipoDocumento,
  typeof TipoDocumento.prototype.id,
  TipoDocumentoRelations
> {

  public readonly votantes: HasManyRepositoryFactory<Votante, typeof TipoDocumento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VotanteRepository') protected votanteRepositoryGetter: Getter<VotanteRepository>,
  ) {
    super(TipoDocumento, dataSource);
    this.votantes = this.createHasManyRepositoryFactoryFor('votantes', votanteRepositoryGetter,);
    this.registerInclusionResolver('votantes', this.votantes.inclusionResolver);
  }
}
