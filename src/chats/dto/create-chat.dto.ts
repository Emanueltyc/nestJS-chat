import { IsString, MinLength, IsBoolean, IsArray } from 'class-validator';

export class CreateChatDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsBoolean()
    isGroup: boolean;

    @IsArray()
    usersId: number[];
}
