import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Voto, VotoRelations} from '../models';

export class VotoRepository extends DefaultCrudRepository<
  Voto,
  typeof Voto.prototype.id,
  VotoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Voto, dataSource);
  }
}
