import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UserController', () => {
	let controller: UsersController
	let service: UsersService
	let userRepo: Repository<User>

	const USER_REPO_TOKEN = getRepositoryToken(User)

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: USER_REPO_TOKEN,
					useValue: {
						create: jest.fn(),
						find: jest.fn(),
						findOne: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile()

		controller = module.get<UsersController>(UsersController)
		service = module.get<UsersService>(UsersService)
		userRepo = module.get<Repository<User>>(USER_REPO_TOKEN)
	})

	it('controller should be defined', () => {
		expect(controller).toBeDefined()
	})
	it('service should be defined', () => {
		expect(service).toBeDefined()
	})
	it('userRepo should be defined', () => {
		expect(userRepo).toBeDefined()
	})
})
