import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { Photo } from './entities/photo.entity'

@Injectable()
export class PhotosService {
	constructor(
		@InjectRepository(Photo) private readonly photoRepo: Repository<Photo>,
	) {}
	async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
		try {
			const newPhoto = this.photoRepo.create(createPhotoDto)
			await this.photoRepo.save(newPhoto)
			return newPhoto
		} catch (error) {
			throw new BadRequestException("Can't create photo")
		}
	}

	async findAll(): Promise<Photo[]> {
		return this.photoRepo.find()
	}

	async findOne(id: number): Promise<Photo> {
		return this.photoRepo.findOneOrFail(id)
	}

	async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
		const photo = await this.findOne(id)
		if (!photo) {
			throw new BadRequestException("Can't find photo to update")
		}
		this.photoRepo.update(id, updatePhotoDto)
		return this.photoRepo.save(photo)
	}

	async remove(id: number): Promise<Photo> {
		const photo = await this.findOne(id)
		if (!photo) {
			throw new BadRequestException("Can't find photo to delete")
		}
		return this.photoRepo.remove(photo)
	}
}
