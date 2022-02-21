import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcryptUtils from '../../utils/bcrypt'
import { User } from '../entities/user.entity'
import { UsersService } from '../users.service'

describe('UserController', () => {
	let service: UsersService
	let userRepo: Repository<User>

	const USER_REPO_TOKEN = getRepositoryToken(User)

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: USER_REPO_TOKEN,
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOne: jest.fn(),
						find: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<UsersService>(UsersService)
		userRepo = module.get<Repository<User>>(USER_REPO_TOKEN)
	})

	it('service should be defined', () => {
		expect(service).toBeDefined()
	})
	it('userRepo should be defined', () => {
		expect(userRepo).toBeDefined()
	})

	describe('createUser', () => {
		jest.spyOn(bcryptUtils, 'encodedPassword').mockReturnValue(
			'encodedpassword',
		)
		const attributes = {
			username: 'test',
			password: 'password',
			firstName: 'test',
			lastName: 'test',
			email: 'osdifhi@gmail.com',
		}
		it('should encoded password correctly', async () => {
			await service.create(attributes)
			expect(bcryptUtils.encodedPassword).toHaveBeenCalledWith('password')
		})
		it('should call userRepo.create with correct params', async () => {
			await service.create(attributes)
			expect(userRepo.create).toHaveBeenCalledWith({
				...attributes,
				password: 'encodedpassword',
			})
			expect(userRepo.create)
		})
	})
})
