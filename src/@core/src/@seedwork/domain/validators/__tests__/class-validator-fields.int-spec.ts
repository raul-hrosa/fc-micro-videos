import { isNotEmpty, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import ClassValidatorFields from '../class-validator-fields'

class StubRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: any){
        Object.assign(this, data)
    }
}

class StubClassValidatorField extends ClassValidatorFields<{field: string}> {
    validate(data: any): boolean {
        return super.validate(new StubRules(data))
    }
}

describe("ClassValidatorFields Integration tests", () => {
    it('should validate with errors', () => {
        const validator = new StubClassValidatorField()
        expect(validator.validate(null)).toBeFalsy()
        expect(validator.errors).toStrictEqual({
            name: [
              'name should not be empty',
              'name must be a string',
              'name must be shorter than or equal to 255 characters'
            ],
            price: [
              'price should not be empty',
              'price must be a number conforming to the specified constraints'
            ]
        })
    })

    it('should be valid', () => {
        const validator = new StubClassValidatorField()
        expect(validator.validate({
            name: 'some value',
            price: 5
        })).toBeTruthy()
        expect(validator.validatedData).toStrictEqual(new StubRules({
            name: 'some value',
            price: 5
        }))
    })
})