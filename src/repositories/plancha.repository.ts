import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plancha, PlanchaRelations} from '../models';

export class PlanchaRepository extends DefaultCrudRepository<
  Plancha,
  typeof Plancha.prototype.id,
  PlanchaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Plancha, dataSource);
  }
}
