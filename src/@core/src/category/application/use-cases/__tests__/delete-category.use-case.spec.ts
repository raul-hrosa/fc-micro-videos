import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import {Category} from '../../../domain/entities/category';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import DeleteCategoryUseCase from '../delete-category.use-case';

describe("DeleteCategoryUseCase Unit Test", () => {
    let useCase: DeleteCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository()
        useCase = new DeleteCategoryUseCase.UseCase(repository)
    })

    it('should throws error when entity not found', async () => {
        expect(() => useCase.execute({id: 'fake id'})).rejects.toThrow(
            new NotFoundError('Entity not found using ID fake id')        
        )
    })


    it("should delete a category", async () => {
        const spyDelete = jest.spyOn(repository,"delete")
        const entity = new Category({name: "Movie"})
        repository.items = [entity]
        
        expect(repository.items).toHaveLength(1)

        await useCase.execute({id: entity.id})
        
        expect(spyDelete).toHaveBeenCalledTimes(1)
        expect(repository.items).toHaveLength(0)
    })
})