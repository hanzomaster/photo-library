import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../ormconfig'
import { AuthModule } from './auth/auth.module'
import { PhotosModule } from './photos/photos.module'
import { UsersModule } from './users/users.module'
import { LoggingMiddleware } from './utils/logging.middleware'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(config),
		UsersModule,
		PhotosModule,
		AuthModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes('*')
	}
}
