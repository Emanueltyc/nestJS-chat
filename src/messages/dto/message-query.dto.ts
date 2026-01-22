import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class MessageQueryDto {
    @IsNumber()
    @IsNotEmpty({ message: 'The chatId parameter cannot be empty' })
    chatId: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;
}
