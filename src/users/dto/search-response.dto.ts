import { User } from '../user.entity';
import { UserResponseDto } from './user-response.dto';

export class SearchResponseDto {
    users: UserResponseDto[];
    total: number;
    limit: number;
    offset: number;

    constructor(users: User[], total: number, limit: number, offset: number) {
        this.users = users.map((user) => new UserResponseDto(user));
        this.total = total;
        this.limit = limit;
        this.offset = offset;
    }
}
