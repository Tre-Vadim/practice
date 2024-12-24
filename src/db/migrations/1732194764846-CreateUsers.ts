import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1732194764846 implements MigrationInterface {
  name = 'CreateUsers1732194764846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "url" character varying NOT NULL DEFAULT '',
                "password" character varying NOT NULL,
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
