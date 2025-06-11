import { type Session } from '../../../session/domain/session';
import { type Role } from '../../../roles/domain/role';
import { type Session } from '../../../session/domain/session';
import { type User } from '../../../users/domain/user';

export type JwtRefreshPayloadType = {
    sessionId: Session['id'];
    hash: Session['hash'];
    iat: number;
    exp: number;
};

export type JwtPayloadType = {
    sessionId: Session['id'];
    roleId: Role['id'];
    id: User['id'];
    iat: number;
    exp: number;
};