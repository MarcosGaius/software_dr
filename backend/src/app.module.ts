import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { SurgeryModule } from './surgery/surgery.module';
import { ProcedureModule } from './procedure/procedure.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ClassificationModule } from './classification/classification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [authConfig, databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    PatientModule,
    UserModule,
    SurgeryModule,
    ProcedureModule,
    ClassificationModule,
  ],
})
export class AppModule {}
