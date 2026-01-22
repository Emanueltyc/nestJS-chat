import { IsNumber, IsString } from 'class-validator';

export class MessageCreateDto {
    @IsString()
    content: string;

    @IsNumber()
    userId: number;

    @IsNumber()
    chatId: number;
}
