import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsEmail,
    IsEnum,
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    MinLength,
    NotEquals,
    ValidateNested,
} from 'class-validator';

import type { Constructor } from '../types';
import { ApiEnumProperty, ApiUUIDProperty } from './property.decorator';
import {
    PhoneNumberSerializer,
    ToArray,
    ToBoolean,
    ToLowerCase,
    ToUpperCase,
} from './transform.decorator';
import {
    IsNullable,
    IsPassword,
    IsPhoneNumber,
    IsUndefinable,
} from './validator.decorator';

interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
    isPositive?: boolean;
}

interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
}

type IClassFieldOptions = IFieldOptions;
type IBooleanFieldOptions = IFieldOptions;
type IEnumFieldOptions = IFieldOptions;

export function NumberField(
    options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => Number)];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: Number, ...(options as ApiPropertyOptions) }),
        );
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.int) {
        decorators.push(IsInt({ each: options.each }));
    } else {
        decorators.push(IsNumber({}, { each: options.each }));
    }

    if (typeof options.min === 'number') {
        decorators.push(Min(options.min, { each: options.each }));
    }

    if (typeof options.max === 'number') {
        decorators.push(Max(options.max, { each: options.each }));
    }

    if (options.isPositive) {
        decorators.push(IsPositive({ each: options.each }));
    }

    return applyDecorators(...decorators);
}

export function NumberFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        INumberFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        NumberField({ required: false, ...options }),
    );
}

export function StringField(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => String), IsString({ each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable({ each: options.each }));
    } else {
        decorators.push(NotEquals(null, { each: options.each }));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({
                type: String,
                ...(options as ApiPropertyOptions),
                isArray: options.each,
            }),
        );
    }

    const minLength = options.minLength ?? 1;

    decorators.push(MinLength(minLength, { each: options.each }));

    if (options.maxLength) {
        decorators.push(MaxLength(options.maxLength, { each: options.each }));
    }

    if (options.toLowerCase) {
        decorators.push(ToLowerCase());
    }

    if (options.toUpperCase) {
        decorators.push(ToUpperCase());
    }

    return applyDecorators(...decorators);
}

export function StringFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        IStringFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        StringField({ required: false, ...options }),
    );
}

export function PasswordField(
    options: Omit<ApiPropertyOptions, 'type' | 'minLength'> &
        IStringFieldOptions = {},
): PropertyDecorator {
    const decorators = [StringField({ ...options, minLength: 6 }), IsPassword()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    return applyDecorators(...decorators);
}

export function PasswordFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required' | 'minLength'> &
        IStringFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        PasswordField({ required: false, ...options }),
    );
}

export function BooleanField(
    options: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions = {},
): PropertyDecorator {
    const decorators = [ToBoolean(), IsBoolean()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: Boolean, ...(options as ApiPropertyOptions) }),
        );
    }

    return applyDecorators(...decorators);
}

export function BooleanFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        IBooleanFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        BooleanField({ required: false, ...options }),
    );
}

export function EnumField<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName' | 'isArray'> &
        IEnumFieldOptions = {},
): PropertyDecorator {
    const enumValue = getEnum();
    const decorators = [IsEnum(enumValue, { each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiEnumProperty(getEnum, { ...options, isArray: options.each }),
        );
    }

    return applyDecorators(...decorators);
}

export function ClassField<TClass extends Constructor>(
    getClass: () => TClass,
    options: Omit<ApiPropertyOptions, 'type'> & IClassFieldOptions = {},
): PropertyDecorator {
    const entity = getClass();

    const decorators = [
        Type(() => entity),
        ValidateNested({ each: options.each }),
    ];

    if (options.required !== false) {
        decorators.push(IsDefined());
    }

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({
                type: () => entity,
                ...(options as ApiPropertyOptions),
            }),
        );
    }

    return applyDecorators(...decorators);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function EnumFieldOptional<TEnum extends object>(
    getEnum: () => TEnum,
    options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
        IEnumFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        EnumField(getEnum, { required: false, ...options }),
    );
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function ClassFieldOptional<TClass extends Constructor>(
    getClass: () => TClass,
    options: Omit<ApiPropertyOptions, 'type' | 'required'> &
        IClassFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        ClassField(getClass, { required: false, ...options }),
    );
}

export function EmailField(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    const decorators = [
        IsEmail(),
        StringField({ toLowerCase: true, ...options }),
    ];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: String, ...(options as ApiPropertyOptions) }),
        );
    }

    return applyDecorators(...decorators);
}

export function EmailFieldOptional(
    options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        EmailField({ required: false, ...options }),
    );
}

export function PhoneField(
    options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator {
    const decorators = [IsPhoneNumber(), PhoneNumberSerializer()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: String, ...(options as ApiPropertyOptions) }),
        );
    }

    return applyDecorators(...decorators);
}

export function PhoneFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        PhoneField({ required: false, ...options }),
    );
}

export function UUIDField(
    options: Omit<ApiPropertyOptions, 'type' | 'format' | 'isArray'> &
        IFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => String), IsUUID('4', { each: options.each })];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(ApiUUIDProperty(options));
    }

    if (options.each) {
        decorators.push(ToArray());
    }

    return applyDecorators(...decorators);
}

export function UUIDFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required' | 'isArray'> &
        IFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        UUIDField({ required: false, ...options }),
    );
}

export function DateField(
    options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator {
    const decorators = [Type(() => Date), IsDate()];

    if (options.nullable) {
        decorators.push(IsNullable());
    } else {
        decorators.push(NotEquals(null));
    }

    if (options.swagger !== false) {
        decorators.push(
            ApiProperty({ type: Date, ...(options as ApiPropertyOptions) }),
        );
    }

    return applyDecorators(...decorators);
}

export function DateFieldOptional(
    options: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions = {},
): PropertyDecorator {
    return applyDecorators(
        IsUndefinable(),
        DateField({ ...options, required: false }),
    );
}