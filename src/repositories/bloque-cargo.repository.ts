import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {BloqueCargo, BloqueCargoRelations} from '../models';

export class BloqueCargoRepository extends DefaultCrudRepository<
  BloqueCargo,
  typeof BloqueCargo.prototype.id,
  BloqueCargoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(BloqueCargo, dataSource);
  }
}
