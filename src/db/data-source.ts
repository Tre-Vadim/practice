import { DataSource } from 'typeorm';

/**
 * special function for get DataSource
 * used only for migration functionality
 * @returns new DataSource
 */
const dataSource = () => {
  return new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mainroot',
    database: 'nestjs-practice-db',
    entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
  });
};

export default dataSource();
