import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706370534425 implements MigrationInterface {
    name = 'Migration1706370534425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "morphology"`);
        await queryRunner.query(`ALTER TABLE "anderson2011_meniscus_lesion_classification" DROP COLUMN "criteria"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "horizontal" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "longitudinal" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "radial" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "root" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "displaced" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "complex" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "bucketHandle" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "fraying" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "fraying"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "bucketHandle"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "complex"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "displaced"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "root"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "radial"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "longitudinal"`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" DROP COLUMN "horizontal"`);
        await queryRunner.query(`ALTER TABLE "anderson2011_meniscus_lesion_classification" ADD "criteria" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nguyen2014_morphology_meniscus_lesion" ADD "morphology" character varying NOT NULL`);
    }

}
