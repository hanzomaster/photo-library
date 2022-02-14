import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Photo } from '../../photos/entities/photo.entity'

@Entity({
	name: 'users',
})
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Exclude({
		toPlainOnly: true,
	})
	@Column()
	password: string

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({
		unique: true,
	})
	email: string

	@OneToMany(() => Photo, photo => photo.user, {
		eager: true,
		cascade: true,
	})
	photos?: Photo[]
}
