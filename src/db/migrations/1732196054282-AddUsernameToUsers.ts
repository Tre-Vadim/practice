import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUsers1732196054282 implements MigrationInterface {
  name = 'AddUsernameToUsers1732196054282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" 
            ADD "username" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
  }
}
