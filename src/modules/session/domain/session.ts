import { UserResponse } from '../../users/dto/create-user.response';

export class Session {
    id: number;
    user: UserResponse;
    hash: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}