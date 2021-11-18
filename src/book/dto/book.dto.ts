export class createBookDto {
    readonly title: string
    readonly genre: string
    readonly description: string
    readonly author: string
    readonly publisher: string
    readonly pages: string
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