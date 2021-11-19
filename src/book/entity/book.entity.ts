import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number
  
  @ApiProperty({ example: 'exhalation' })
  @Column()
  title: string
  
  @ApiProperty({ example: 'novela' })
  @Column()
  genre: string
  
  @ApiProperty({ example: 'novela de ciencia ficción ..' })
  @Column()
  description: string
  
  @ApiProperty({ example: 'Ted, Chiang' })
  @Column()
  author: string
  
  @ApiProperty({ example: 'Narrativa Sexto Piso' })
  @Column()
  publisher: string
  
  @ApiProperty({ example: '384 pages' })
  @Column()
  pages: number
  
  @ApiProperty({ example: 'https://x.com/myPhoto.jpg' })
  @Column()
  image_url: string

  @Column({ default: true })
  available: boolean
}
