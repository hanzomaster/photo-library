import { BadRequestException, Injectable, Logger } from '@nestjs/common'
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
			return Promise.resolve(this.photoRepo.save(newPhoto))
		} catch (error) {
			Logger.error(error, 'PhotosService')
			throw new BadRequestException('Wrong input data')
		}
	}

	async findAll(): Promise<Photo[]> {
		return Promise.resolve(
			this.photoRepo.find({
				order: {
					id: 'ASC',
				},
			}),
		)
	}

	async findOne(id: number): Promise<Photo> {
		try {
			return await this.photoRepo.findOneOrFail(id)
		} catch (error) {
			Logger.error(`Can't find photo with id ${id}`, 'PhotosService')
			throw new BadRequestException("Can't find photo")
		}
	}

	async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
		const updatedPhoto = await this.findOne(id)
		if (!updatedPhoto) {
			throw new BadRequestException("Can't find user to update")
		}
		this.photoRepo.update(id, updatePhotoDto)
		return Promise.resolve(this.photoRepo.save(updatedPhoto))
	}

	async remove(id: number): Promise<Photo> {
		const deletedPhoto = await this.findOne(id)
		if (!deletedPhoto) {
			throw new BadRequestException("Can't find photo to delete")
		}
		return Promise.resolve(this.photoRepo.remove(deletedPhoto))
	}
}
