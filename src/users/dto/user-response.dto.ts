import { User } from '../user.entity';

export class UserResponseDto {
    id: string;
    name: string;
    email: string;
    picture: string;
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id.toString();
        this.name = user.name;
        this.email = user.email;
        this.picture = user.picture || '';
        this.createdAt = user.createdAt;
    }
}
