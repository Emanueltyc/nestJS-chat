import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;
}
