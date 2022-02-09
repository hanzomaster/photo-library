import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { PhotosModule } from './photos/photos.module'
import config from '../ormconfig'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(config),
		UsersModule,
		PhotosModule,
	],
})
export class AppModule {}
