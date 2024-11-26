import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const ormConfig = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mainroot',
    database: 'nestjs-practice-db',
    entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  }),
  dataSourceFactory: (options) => {
    const dataSource = new DataSource(options);
    return dataSource.initialize();
  },
});
export default ormConfig;
