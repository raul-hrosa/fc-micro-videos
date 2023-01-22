import { ValidationError } from '../../../../@seedwork/domain/errors/validation-error'
import ValidatorRules from '../validator-rules'


type Values = {
    value: any, 
    property: string
}

type ExpectedRule = {
    value: any, 
    property: string, 
    rule: keyof ValidatorRules, 
    error: ValidationError,
    params?: any[]
}

function assertIsInvalid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected)
    }).toThrow(expected.error) 
}

function assertIsValid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected)
    }).not.toThrow(expected.error) 
}

function runRule({value, property, rule, params = []}: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property)
    const method = validator[rule]
    method.apply(validator, params)
}

describe("ValidatorsRules unit test", () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field')
        expect(validator).toBeInstanceOf(ValidatorRules)
        expect(validator['value']).toBe('some value')
        expect(validator['property']).toBe('field')
    })

    test('required validation rule', () => {
        const invalidArrange: Values[] = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: '', property: 'field' },
        ]
        
        const error = new ValidationError('The field is required')

        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'required',
                error: error
            })
        })

        const validArrange: Values[] = [
            { value: 'test', property: 'field' },
            { value: 5, property: 'field' },
            { value: 0, property: 'field' },
            { value: false, property: 'field' },
        ]
        
        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'required',
                error: error
            })   
        })
    })

    test("string validation rule", () => {
        const invalidArrange: Values[] = [
            {value: 5, property: "field"},
            {value: {}, property: "field"},
            {value: false, property: "field"}
        ]

        const error = new ValidationError('The field must be a string')

        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'string',
                error: error
            })
        })

        const validArrange: Values[] = [
            {value: null, property: "field"},
            {value: undefined, property: "field"},
            {value: "test", property: "field"}
        ]

        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'string',
                error: error
            })
        })
    })

    test("maxLength validation rule", () => {
        const invalidArrange: Values[] = [
            {value: "aaaaaa", property: "field"}
        ]

        const error = new ValidationError('The field must be less or equal 5 characters')

        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error: error,
                params: [5]
            })
        })

        const validArrange: Values[] = [
            {value: null, property: "field"},
            {value: undefined, property: "field"},
            {value: "aaaaa", property: "field"}
        ]

        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error: error,
                params: [5]
            })
        })
    })

    test("boolean validation rule", () => {
        const invalidArrange: Values[] = [
            {value: 5, property: "field"},
            {value: "true", property: "field"},
            {value: "false", property: "field"}
        ]

        const error = new ValidationError('The field must be a boolean')

        invalidArrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'boolean',
                error: error
            })
        })

        const validArrange: Values[] = [
            {value: null, property: "field"},
            {value: undefined, property: "field"},
            {value: false, property: "field"},
            {value: true, property: "field"}
        ]

        validArrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'boolean',
                error: error
            })
        })
    })

    test('should throw a validation erro when combine two or more validation rules', () => {
        let validator = ValidatorRules.values(null, 'field')
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field is required"))

        validator = ValidatorRules.values(5, 'field')
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field must be a string"))

        validator = ValidatorRules.values("aaaaa6", 'field')
        expect(() => {
            validator.required().string().maxLength(5)
        }).toThrow(new ValidationError("The field must be less or equal 5 characters"))

        validator = ValidatorRules.values(null, 'field')
        expect(() => {
            validator.required().boolean()
        }).toThrow(new ValidationError("The field is required"))

        validator = ValidatorRules.values(5, 'field')
        expect(() => {
            validator.required().boolean()
        }).toThrow(new ValidationError("The field must be a boolean"))
    })

    test('should valid a validation erro when combine two or more validation rules', () => {
        expect.assertions(0)
        ValidatorRules.values("test", "field").required().string()
        ValidatorRules.values("aaaaa", "field").required().string().maxLength(5)
        ValidatorRules.values(true, "field").required().boolean()
        ValidatorRules.values(false, "field").required().boolean()
    })
})