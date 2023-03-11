import {Category} from '../../../category/domain/entities/category'
import { CategoryOutputMapper } from './category-output';

describe("CategoryOutputMapper unit test", () => {
    it("should convert a categoty in output", () => {
        const created_at = new Date();
        const entity = new Category({
            name: "Movie",
            description: "description",
            is_active: true,
            created_at: created_at
        })

        const spyToJSON = jest.spyOn(entity, "toJSON");
        const output = CategoryOutputMapper.toOutput(entity)
        expect(spyToJSON).toHaveBeenCalled()
        expect(output).toStrictEqual({
            id: entity.id,
            name: "Movie",
            description: "description",
            is_active: true,
            created_at: created_at
        })
        
    })
})