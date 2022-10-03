import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Votante, VotanteRelations, TipoDocumento, Bloque, BloqueVotante} from '../models';
import {TipoDocumentoRepository} from './tipo-documento.repository';
import {BloqueVotanteRepository} from './bloque-votante.repository';
import {BloqueRepository} from './bloque.repository';

export class VotanteRepository extends DefaultCrudRepository<
  Votante,
  typeof Votante.prototype.id,
  VotanteRelations
> {

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Votante.prototype.id>;

  public readonly bloques: HasManyThroughRepositoryFactory<Bloque, typeof Bloque.prototype.id,
          BloqueVotante,
          typeof Votante.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>, @repository.getter('BloqueVotanteRepository') protected bloqueVotanteRepositoryGetter: Getter<BloqueVotanteRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Votante, dataSource);
    this.bloques = this.createHasManyThroughRepositoryFactoryFor('bloques', bloqueRepositoryGetter, bloqueVotanteRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
  }
}
