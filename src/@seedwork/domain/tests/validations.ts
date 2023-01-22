import { EntityValidationError } from '../errors/validation-error'
import ClassValidatorFields from '../validators/class-validator-fields'
import { FieldsErrors } from '../validators/validator-fields-interface'

type Expected = {
    validator: ClassValidatorFields<any>
    data: any
} | (() => any)

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldsErrors){
        if (typeof expected === "function"){
            try {
                expected()
                return {
                    pass: false,
                    message: () => 'The data is valid'
                }
            } catch (e) {
                const error = e as EntityValidationError;
                return assertContainsErrorsMessages(error.error, received)
            }
        } else {
            const { validator, data } = expected
            const validated = validator.validate(data)
    
            if(validated){
               isValid()
            }
     
            return assertContainsErrorsMessages(validator.errors, received)
        }
    } 
})

function isValid() {
    return { pass: true, message: () => "" }  
}

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors){
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected)
    return isMatch 
    ? isValid()
    : { 
        pass: false, 
        message: () => 
            `The validation erros not contains ${JSON.stringify(received)}. Current ${JSON.stringify(expected)}`
        }
}