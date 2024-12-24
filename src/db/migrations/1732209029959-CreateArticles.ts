import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticles1732209029959 implements MigrationInterface {
  name = 'CreateArticles1732209029959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" BIGSERIAL NOT NULL,
                "slug" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL DEFAULT '',
                "body" character varying NOT NULL DEFAULT '',
                "tagList" text NOT NULL,
                "favoritesCount" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "tags" DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99"
        `);
    await queryRunner.query(`
            ALTER TABLE "tags" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "tags"
            ADD "id" BIGSERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "tags"
            ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "PK_b54f8ea623b17094db7667d8206"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "id" BIGSERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "id" SERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
        `);
    await queryRunner.query(`
            ALTER TABLE "tags" DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99"
        `);
    await queryRunner.query(`
            ALTER TABLE "tags" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "tags"
            ADD "id" SERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "tags"
            ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")
        `);
    await queryRunner.query(`
            DROP TABLE "articles"
        `);
  }
}
