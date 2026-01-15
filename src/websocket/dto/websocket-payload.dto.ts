import { IsNumber, IsString } from 'class-validator';

export class WebsocketPayloadDto {
    @IsString()
    content: string;

    @IsNumber()
    chatId: number;
}
