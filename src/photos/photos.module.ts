import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Photo } from './entities/photo.entity'
import { PhotosController } from './photos.controller'
import { PhotosService } from './photos.service'

@Module({
	imports: [TypeOrmModule.forFeature([Photo])],
	controllers: [PhotosController],
	providers: [
		PhotosService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class PhotosModule {}
