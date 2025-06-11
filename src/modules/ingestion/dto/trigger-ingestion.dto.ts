import { NumberField } from '../../../decorators/field.decorator';

export class TriggerIngestionDto {
    @NumberField()
    documentId: number;
}