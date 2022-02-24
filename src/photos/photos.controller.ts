import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { Photo } from './entities/photo.entity'
import { PhotosService } from './photos.service'

@ApiTags('photos')
@UseGuards(JwtAuthGuard)
@Controller('photos')
export class PhotosController {
	constructor(private readonly photosService: PhotosService) {}

	@Post()
	create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
		return this.photosService.create(createPhotoDto)
	}

	@Get()
	findAll(): Promise<Photo[]> {
		return this.photosService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: number): Promise<Photo> {
		return this.photosService.findOne(id)
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updatePhotoDto: UpdatePhotoDto,
	): Promise<Photo> {
		return this.photosService.update(id, updatePhotoDto)
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<Photo> {
		return this.photosService.remove(id)
	}
}
