import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
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
		const newUser = this.userRepo.create({ ...createUserDto, password })
		return Promise.resolve(this.userRepo.save(newUser))
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
		try {
			return await this.userRepo.findOneOrFail(id)
		} catch (error) {
			Logger.error(`Can't find user with id ${id}`, 'UsersService')
			throw new BadRequestException("Can't find user")
		}
	}

	/**
	 * Find user by mail
	 * @param email Email of the user
	 * @returns The user with the given email
	 */
	async findOneByEmail(email: string): Promise<User> {
		const user = await this.userRepo.findOne({ email })
		return Promise.resolve(user)
	}

	/**
	 * Find user by username
	 * @param username Username of the user
	 * @returns The user with the given username
	 */
	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userRepo.findOne({ username })
		return Promise.resolve(user)
	}

	async update(
		id: number,
		updateUserDto: UpdateUserDto,
	): Promise<UpdateResult> {
		const updatedUser = await this.findOne(id)
		if (!updatedUser) {
			throw new BadRequestException("Can't find user to update")
		}
		return Promise.resolve(this.userRepo.update(id, updateUserDto))
	}

	async remove(id: number): Promise<User> {
		const user = await this.findOne(id)
		if (!user) {
			throw new BadRequestException("Can't find user to delete")
		}
		return Promise.resolve(this.userRepo.remove(user))
	}
}
