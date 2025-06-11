import { Session } from '../../../session/domain/session';
import { Role } from '../../../roles/dto/role-reponse.dto';
import { UserResponse } from '../../../users/dto/create-user.response';

export type JwtRefreshPayloadType = {
    sessionId: Session['id'];
    hash: Session['hash'];
    iat: number;
    exp: number;
};

export type JwtPayloadType = {
    sessionId: Session['id'];
    roleId: Role['id'];
    id: UserResponse['id'];
    iat: number;
    exp: number;
};