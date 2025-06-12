import {
    ClassField,
    DateField,
    NumberField,
    StringField,
} from '../../../decorators/field.decorator';
import { FileType } from '../../files/domain/file';
import { UserResponse } from 'src/modules/users/dto/create-user.response';

export class Document {
    @NumberField()
    id: number;

    @StringField()
    title: string;

    @StringField({ nullable: true })
    description?: string;

    @ClassField(() => FileType)
    file: FileType;

    @ClassField(() => UserResponse)
    uploadedBy: UserResponse;

    @DateField()
    createdAt: Date;

    @DateField()
    updatedAt: Date;
}