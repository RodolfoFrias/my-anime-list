import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { USER, HOST, DB_NAME, PASSWORD, PORT } =
          configService.get('config.postgres');
        return {
          type: 'postgres',
          username: USER,
          host: HOST,
          database: DB_NAME,
          password: PASSWORD,
          port: +PORT,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
