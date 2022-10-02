import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Eleccion, EleccionRelations} from '../models';

export class EleccionRepository extends DefaultCrudRepository<
  Eleccion,
  typeof Eleccion.prototype.id,
  EleccionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Eleccion, dataSource);
  }
}
