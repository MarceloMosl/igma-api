import { HttpCode, UnprocessableEntityException } from '@nestjs/common';
import {
    IsNotEmpty,
    IsString,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';

import { parse, isValid, isAfter } from 'date-fns';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @IsString()
    @IsDateFormatted({ message: 'Data de nascimento inválida' })
    nascimento: string;

    @IsNotEmpty()
    @IsString()
    @IsCPFFormat({ message: 'formato do CPF enviado inválido' })
    @IsCPF({ message: 'CPF inválido' })
    cpf: string;
}

export class GetClientDto {
    @IsNotEmpty()
    @IsString()
    @IsCPFFormat({ message: 'formato do CPF enviado inválido' })
    @IsCPF({ message: 'CPF inválido' })
    cpf: string;
}

function IsDateFormatted(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isDateFormatted',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // Define o formato de data "DD/MM/YYYY"
                    const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

                   
                    if (!dateFormatRegex.test(value)) {
                        return false;
                    }

                    const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
                    if (!isValid(parsedDate)) {
                        return false;
                    }
                    if (!isValid(parsedDate) || isAfter(parsedDate, new Date())) {
                        return false;
                    }

                    return true;
                },
            },
        });
    };
}

// validacao de formato do cpf
function IsCPFFormat(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isCPFFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                    const isNumber = /^\d+$/;

                    return isNumber.test(value) || cpfRegex.test(value);
                },
            },
        });
    };
}

// validação do cpf 
function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    // deixa apenas numeros
                    const numericCPF = value.replace(/\D/g, '');

                    // varifica se o tamanho está correto (11)
                    if (numericCPF.length !== 11) {
                        return false;
                    }

                    // calculo do primeiro numero
                    let sum = 0;
                    let remainder = 0;
                    for (let i = 1; i <= 9; i++) {
                        sum += parseInt(numericCPF[i - 1]) * (11 - i);
                    }
                    remainder = (sum * 10) % 11;
                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }
                    if (remainder !== parseInt(numericCPF[9])) {
                        throw new UnprocessableEntityException("CPF Invalido")
                    }

                    // calculo do segundo numero
                    sum = 0;
                    remainder = 0;
                    for (let i = 1; i <= 10; i++) {
                        sum += parseInt(numericCPF[i - 1]) * (12 - i);
                    }
                    remainder = (sum * 10) % 11;
                    if (remainder === 10 || remainder === 11) {
                        remainder = 0;
                    }
                    if (remainder !== parseInt(numericCPF[10])) {
                        throw new UnprocessableEntityException("CPF Invalido");
                    }

                    return true; // retorna true se o resultados dos calculos dos dois numeros forem corretos
                },
            },
        });
    };
}