"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientDto = exports.CreateClientDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const date_fns_1 = require("date-fns");
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    IsDateFormatted({ message: 'Data de nascimento inválida' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "nascimento", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    IsCPFFormat({ message: 'formato do CPF enviado inválido' }),
    IsCPF({ message: 'CPF inválido' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "cpf", void 0);
class GetClientDto {
}
exports.GetClientDto = GetClientDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    IsCPFFormat({ message: 'formato do CPF enviado inválido' }),
    IsCPF({ message: 'CPF inválido' }),
    __metadata("design:type", String)
], GetClientDto.prototype, "cpf", void 0);
function IsDateFormatted(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isDateFormatted',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                    if (!dateFormatRegex.test(value)) {
                        return false;
                    }
                    const parsedDate = (0, date_fns_1.parse)(value, 'dd/MM/yyyy', new Date());
                    if (!(0, date_fns_1.isValid)(parsedDate)) {
                        return false;
                    }
                    if (!(0, date_fns_1.isValid)(parsedDate) || (0, date_fns_1.isAfter)(parsedDate, new Date())) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
function IsCPFFormat(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCPFFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                    const isNumber = /^\d+$/;
                    return isNumber.test(value) || cpfRegex.test(value);
                },
            },
        });
    };
}
function IsCPF(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCPF',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    const numericCPF = value.replace(/\D/g, '');
                    if (numericCPF.length !== 11) {
                        return false;
                    }
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
                        throw new common_1.UnprocessableEntityException("CPF Invalido");
                    }
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
                        throw new common_1.UnprocessableEntityException("CPF Invalido");
                    }
                    return true;
                },
            },
        });
    };
}
//# sourceMappingURL=clientsDtos.js.map