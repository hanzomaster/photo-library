import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Photo } from '../photos/entities/photo.entity'
import { encodedPassword } from '../utils/bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const password = encodedPassword(createUserDto.password)
		try {
			const newUser = this.userRepo.create({ ...createUserDto, password })
			return Promise.resolve(this.userRepo.save(newUser))
		} catch (error) {
			throw new BadRequestException("Can't create user")
		}
	}

	async findAll(): Promise<User[]> {
		const users = await this.userRepo.find({
			order: {
				id: 'ASC',
			},
		})
		return Promise.resolve(users)
	}

	async findAllPhoto(id: number): Promise<Photo[]> {
		const user = await this.findOne(id)
		return Promise.resolve(user.photos)
	}

	async findOne(id: number): Promise<User> {
		const user = await this.userRepo.findOneOrFail(id)
		return Promise.resolve(user)
	}

	async findOneByName(username: string): Promise<User> {
		const user = await this.userRepo.findOneOrFail({ username })
		return Promise.resolve(user)
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const updatedUser = await this.findOne(id)
		if (!updatedUser) {
			throw new BadRequestException("Can't find user to update")
		}
		this.userRepo.update(id, updateUserDto)
		return Promise.resolve(this.userRepo.save(updatedUser))
	}

	async remove(id: number): Promise<User> {
		const user = await this.findOne(id)
		if (!user) {
			throw new BadRequestException("Can't find user to delete")
		}
		return Promise.resolve(this.userRepo.remove(user))
	}
}
