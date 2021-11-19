import { ApiProperty } from '@nestjs/swagger'
export class createBookDto {
    @ApiProperty({example: 'exhalation'})
    readonly title: string
    @ApiProperty({example: 'novela'})
    readonly genre: string
    @ApiProperty({example: 'novela de ciencia ficción ..'})
    readonly description: string
    @ApiProperty({example: 'Ted, Chiang'})
    readonly author: string
    @ApiProperty({example: 'Narrativa Sexto Piso'})
    readonly publisher: string
    @ApiProperty({example: '384 pages'})
    readonly pages: string
    @ApiProperty({example: 'https://x.com/myPhoto.jpg'})
    readonly image_url: string
}

export class updateBookDto {
    readonly id:number
    readonly title: string
    readonly genre: string
    readonly description: string
    readonly author: string
    readonly publisher: string
    readonly pages: string
    readonly image_url: string
}