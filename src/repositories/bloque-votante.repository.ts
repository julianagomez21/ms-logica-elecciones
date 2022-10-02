import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BloqueVotante, BloqueVotanteRelations} from '../models';

export class BloqueVotanteRepository extends DefaultCrudRepository<
  BloqueVotante,
  typeof BloqueVotante.prototype.id,
  BloqueVotanteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(BloqueVotante, dataSource);
  }
}
