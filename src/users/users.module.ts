import { forwardRef, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [
		UsersService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
