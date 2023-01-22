import UniqueEntityId from '../unique-entity-id.vo'
import InvalidUuidError from '../../errors/invalid-uuid.error';
import { validate as uuidValidate } from 'uuid'

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId unit test',() => {
    it('should thro erro when uuid is invalid', () => {
        const validateSpy = spyValidateMethod()
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod()
        const uuid = '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8'
        const vo = new UniqueEntityId(uuid)
        expect(vo.value).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod()
        const vo = new UniqueEntityId()
        expect(uuidValidate(vo.value)).toBeTruthy
        expect(validateSpy).toHaveBeenCalled()
    })
})