import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ResponsesModule } from './responses/responses.module';
import { ImageratingsModule } from './imageratings/imageratings.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';



@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ResponsesModule,
    ImageratingsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
