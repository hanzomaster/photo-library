import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Photo } from '../photos/entities/photo.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			const newUser = this.userRepo.create(createUserDto)
			await this.userRepo.save(newUser)
			return newUser
		} catch (error) {
			throw new BadRequestException("Can't create user")
		}
	}

	async findAll(): Promise<User[]> {
		return this.userRepo.find()
	}

	async findAllPhoto(id: number): Promise<Photo[]> {
		const user = await this.findOne(id)
		if (!user) {
			throw new BadRequestException("Can't find user to update")
		}
		return user.photos
	}

	async findOne(id: number): Promise<User> {
		return this.userRepo.findOneOrFail(id)
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findOne(id)
		if (!user) {
			throw new BadRequestException("Can't find user to update")
		}
		this.userRepo.update(id, updateUserDto)
		return this.userRepo.save(user)
	}

	async remove(id: number): Promise<User> {
		const user = await this.findOne(id)
		if (!user) {
			throw new BadRequestException("Can't find user to delete")
		}
		return this.userRepo.remove(user)
	}
}
