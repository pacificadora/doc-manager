import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';

export function getVariableName<TResult>(
    getVar: () => TResult,
): string | undefined {
    const m = /\(\)=>(.*)/.exec(
        getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
    );

    if (!m) {
        throw new Error(
            "The function does not contain a statement matching 'return variableName;'",
        );
    }

    const fullMemberName = m[1];

    const memberParts = fullMemberName.split('.');

    return memberParts.at(-1);
}


export function ApiBooleanProperty(
    options: Omit<ApiPropertyOptions, 'type'> = {},
): PropertyDecorator {
    return ApiProperty({ type: Boolean, ...(options as ApiPropertyOptions) });
}

export function ApiBooleanPropertyOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> = {},
): PropertyDecorator {
    return ApiBooleanProperty({ required: false, ...options });
}

export function ApiUUIDProperty(
    options: Omit<ApiPropertyOptions, 'type' | 'format'> &
        Partial<{ each: boolean }> = {},
): PropertyDecorator {
    return ApiProperty({
        type: options.each ? [String] : String,
        format: 'uuid',
        isArray: options.each,
        ...(options as ApiPropertyOptions),
    });
}

export function ApiUUIDPropertyOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'format' | 'required'> &
        Partial<{ each: boolean }> = {},
): PropertyDecorator {
    return ApiUUIDProperty({ required: false, ...options });
}

export function ApiEnumProperty<TEnum>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator {
    const enumValue = getEnum() as Record<string, unknown>;

    return ApiProperty({
        enum: enumValue,
        enumName: getVariableName(getEnum),
        ...(options as ApiPropertyOptions),
    });
}

export function ApiEnumPropertyOptional<TEnum>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'required'> & {
        each?: boolean;
    } = {},
): PropertyDecorator {
    return ApiEnumProperty(getEnum, { required: false, ...options });
}