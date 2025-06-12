import { NumberField, StringField } from '../../../decorators/field.decorator';

export class FileDto {
    @NumberField()
    id: number;

    @StringField()
    path: string;
}