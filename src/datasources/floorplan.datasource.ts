import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'floorplan',
  connector: 'mongodb',
  url: 'mongodb+srv://leandromanciagli:ACDC2009..@cluster0.d18qq8t.mongodb.net/floorplan?retryWrites=true&w=majority&appName=Cluster0',
  // host: '',
  // port: 0,
  // user: '',
  // password: '',
  // database: '',
  // useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class FloorplanDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'floorplan';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.floorplan', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
