import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	)
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	)

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Photo Library')
		.setDescription('Contain user with photos')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document, {
		customSiteTitle: 'My API',
	})

	await app.listen(3000)
}
bootstrap()
