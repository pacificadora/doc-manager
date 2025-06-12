import { NumberField } from '../../../decorators/field.decorator';

export class ChangeRoleDto {
    @NumberField()
    roleId: number;
}