import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(helmet())
	app.enableCors()
	app.setGlobalPrefix('api')

	// Global class-validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // No need to specify pipe
			whitelist: true,
			forbidNonWhitelisted: true,
			disableErrorMessages:
				process.env.NODE_ENV === 'development' ? false : true,
		}),
	)

	// Global class-tranformer
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	)

	// Swagger (Documentation)
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
	console.log(`Playground is running on: ${await app.getUrl()}/swagger`)
}
bootstrap()
