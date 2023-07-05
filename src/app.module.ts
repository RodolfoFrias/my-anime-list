import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesModule } from './animes/animes.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import config from './config';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AnimesModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
