import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    PrometheusModule.register(),
  ],
})
export class AppModule {}
