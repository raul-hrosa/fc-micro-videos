import {Category} from '../../domain/entities/category';
import CategoryInMemoryRepository from './category-in-memory.repository'

describe("CategoryInMemoryRepository test", () => {
    let repository: CategoryInMemoryRepository;

    beforeEach(() => (repository = new CategoryInMemoryRepository()));

    test("should no filter when filter is not provided", async () => {
        const items = [new Category({name: "any name"})]
        const spyFilter = jest.spyOn(items, "filter")

        let itemsFilter = await repository["applyFilter"](items, null)
        expect(itemsFilter).toStrictEqual(items)
        expect(spyFilter).not.toHaveBeenCalled()

        itemsFilter = await repository["applyFilter"](items, undefined)
        expect(itemsFilter).toStrictEqual(items)
        expect(spyFilter).not.toHaveBeenCalled()
    })

    test("should sort by created_at if sort_dir has no provided", async () => {
        const items = [
            new Category({name: "test", created_at: new Date()}), 
            new Category({name: "name", created_at: new Date('2023-01-10T12:00')}), 
            new Category({name: "TEST", created_at: new Date('2023-01-08T03:00')}),
            new Category({name: "other", created_at: new Date('2023-01-10T13:10')}),
        ]

        let itemsFilter = await repository["applySort"](items, null, null)
        expect(itemsFilter).toStrictEqual([items[0], items[3], items[1], items[2]])
    })

    test("should sort by created_at ", async () => {
        const items = [
            new Category({name: "test", created_at: new Date()}), 
            new Category({name: "name", created_at: new Date('2023-01-10T12:00')}), 
            new Category({name: "TEST", created_at: new Date('2023-01-08T03:00')}),
            new Category({name: "other", created_at: new Date('2023-01-10T13:10')}),
        ]

        let itemsFilter = await repository["applySort"](items, "created_at", "asc")
        expect(itemsFilter).toStrictEqual([items[2], items[1], items[3], items[0]])

        itemsFilter = await repository["applySort"](items, "created_at", "desc")
        expect(itemsFilter).toStrictEqual([items[0], items[3], items[1], items[2]])

        itemsFilter = await repository["applySort"](items, "created_at", null)
        expect(itemsFilter).toStrictEqual([items[0], items[3], items[1], items[2]])
    })

    test("should sort by name", async () => {
        const items = [
            new Category({name: "b"}), 
            new Category({name: "c"}), 
            new Category({name: "a"}),
        ]

        let itemsFilter = await repository["applySort"](items, "name", "asc")
        expect(itemsFilter).toStrictEqual([items[2], items[0], items[1]])

        itemsFilter = await repository["applySort"](items, "name", "desc")
        expect(itemsFilter).toStrictEqual([items[1], items[0], items[2]])

        itemsFilter = await repository["applySort"](items, "name", null)
        expect(itemsFilter).toStrictEqual([items[1], items[0], items[2]])
    })

})