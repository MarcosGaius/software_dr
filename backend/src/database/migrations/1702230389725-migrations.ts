import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702230389725 implements MigrationInterface {
    name = 'Migrations1702230389725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meniscectomia" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "relativePosition" character varying NOT NULL, "portion" character varying NOT NULL, "injuryRegion" character varying NOT NULL, "injuryExtension" character varying NOT NULL, CONSTRAINT "PK_732c16f210a3a5b5c63838a93e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sutura_meniscal" ("id" SERIAL NOT NULL, "relativePosition" character varying NOT NULL, "portion" character varying NOT NULL, "injuryRegion" character varying NOT NULL, "injuryExtension" character varying NOT NULL, "posteromedialAccess" boolean, "posterolateralAccess" boolean, "sutureTechnique" character varying NOT NULL, "sutureVariation" character varying NOT NULL, CONSTRAINT "PK_876dd5e3dee62474b57eb06b2eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "surgery" ("id" SERIAL NOT NULL, "member" character varying NOT NULL, "memberPosition" character varying NOT NULL, "structure" character varying NOT NULL, "injuryMechanism" character varying NOT NULL, "contralateral" character varying NOT NULL, "limitations" text array DEFAULT '{}', "complaints" text array DEFAULT '{}', "icd" character varying, "icdVersion" integer, "injuredAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "procedure" character varying NOT NULL, "patientId" integer, "meniscectomiaProcedureId" integer, "suturaMeniscalProcedureId" integer, CONSTRAINT "REL_c8f77241870352c6f5251ce1d8" UNIQUE ("meniscectomiaProcedureId"), CONSTRAINT "REL_40efe739d083357bb18e10ff7e" UNIQUE ("suturaMeniscalProcedureId"), CONSTRAINT "PK_2e963fc0e35d07a36e15f331754" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "cpf" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anderson2011_meniscus_lesion_classification" ("id" SERIAL NOT NULL, "criteria" character varying NOT NULL, "lesionType" character varying, "lesionExtension" character varying, "lesionLocation" character varying, "centerToPoplitealHiatus" boolean, "lesionPattern" character varying, "tissueQuality" character varying, "lesionLength" integer, "excisedQuantity" double precision, CONSTRAINT "PK_0513d7fbc8b0a25f7593dde2578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "la_prade2015_medial_lateral_meniscus_root_rupture" ("id" SERIAL NOT NULL, "lesionType" character varying NOT NULL, "lesionVariation" character varying, CONSTRAINT "PK_5380365bd42148e1a5c0412878e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nguyen2014_morphology_meniscus_lesion" ("id" SERIAL NOT NULL, "morphology" character varying NOT NULL, "parameniscalCyst" boolean, "relativePortion" character varying, CONSTRAINT "PK_add485c870d69a09dcd200120d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ramp_meniscus_lesion_classification" ("id" SERIAL NOT NULL, "lesionType" character varying NOT NULL, CONSTRAINT "PK_3978d474409a04192a12600610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "thaunat_greif_classification" ("id" SERIAL NOT NULL, "lesionType" character varying NOT NULL, "lesionVariation" character varying, CONSTRAINT "PK_39a554dfd5713bc413d0c6d5b00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classification" ("id" SERIAL NOT NULL, "structure" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "procedure" character varying NOT NULL, "patientId" integer, "anderson2011MeniscusLesionId" integer, "laprade2015MedialLateralMeniscusRootRuptureId" integer, "nguyen2014MorphologyMeniscusLesionId" integer, "rampMeniscusLesionId" integer, "thaunatGreifId" integer, CONSTRAINT "REL_49ceaed6850afd037ddb94caba" UNIQUE ("anderson2011MeniscusLesionId"), CONSTRAINT "REL_a41c431356cfa795efacedd8df" UNIQUE ("laprade2015MedialLateralMeniscusRootRuptureId"), CONSTRAINT "REL_7ae72f138896f6d301371a19b4" UNIQUE ("nguyen2014MorphologyMeniscusLesionId"), CONSTRAINT "REL_b0d2b55cab09b8a0612e2d3bea" UNIQUE ("rampMeniscusLesionId"), CONSTRAINT "REL_a6b09aed912e7a10387ab421b9" UNIQUE ("thaunatGreifId"), CONSTRAINT "PK_1dc9176492b73104aa3d19ccff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_cf1cdd4b148722b7f56719008ec" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_c8f77241870352c6f5251ce1d81" FOREIGN KEY ("meniscectomiaProcedureId") REFERENCES "meniscectomia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "surgery" ADD CONSTRAINT "FK_40efe739d083357bb18e10ff7e0" FOREIGN KEY ("suturaMeniscalProcedureId") REFERENCES "sutura_meniscal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_583b0d04248791207a4f9833d06" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_49ceaed6850afd037ddb94caba9" FOREIGN KEY ("anderson2011MeniscusLesionId") REFERENCES "anderson2011_meniscus_lesion_classification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_a41c431356cfa795efacedd8df4" FOREIGN KEY ("laprade2015MedialLateralMeniscusRootRuptureId") REFERENCES "la_prade2015_medial_lateral_meniscus_root_rupture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_7ae72f138896f6d301371a19b49" FOREIGN KEY ("nguyen2014MorphologyMeniscusLesionId") REFERENCES "nguyen2014_morphology_meniscus_lesion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_b0d2b55cab09b8a0612e2d3beab" FOREIGN KEY ("rampMeniscusLesionId") REFERENCES "ramp_meniscus_lesion_classification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_a6b09aed912e7a10387ab421b99" FOREIGN KEY ("thaunatGreifId") REFERENCES "thaunat_greif_classification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_a6b09aed912e7a10387ab421b99"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_b0d2b55cab09b8a0612e2d3beab"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_7ae72f138896f6d301371a19b49"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_a41c431356cfa795efacedd8df4"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_49ceaed6850afd037ddb94caba9"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_583b0d04248791207a4f9833d06"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_40efe739d083357bb18e10ff7e0"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_c8f77241870352c6f5251ce1d81"`);
        await queryRunner.query(`ALTER TABLE "surgery" DROP CONSTRAINT "FK_cf1cdd4b148722b7f56719008ec"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "classification"`);
        await queryRunner.query(`DROP TABLE "thaunat_greif_classification"`);
        await queryRunner.query(`DROP TABLE "ramp_meniscus_lesion_classification"`);
        await queryRunner.query(`DROP TABLE "nguyen2014_morphology_meniscus_lesion"`);
        await queryRunner.query(`DROP TABLE "la_prade2015_medial_lateral_meniscus_root_rupture"`);
        await queryRunner.query(`DROP TABLE "anderson2011_meniscus_lesion_classification"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "surgery"`);
        await queryRunner.query(`DROP TABLE "sutura_meniscal"`);
        await queryRunner.query(`DROP TABLE "meniscectomia"`);
    }

}
