import { SearchParams, SearchResult } from '../repository-contracts'

describe('Search Unit Tests', () => {
    describe('SearchParams Unit Test', () => {
        test('page prop', () => {
            const params = new SearchParams()
            expect(params.page).toBe(1)
    
            const arrange = [
                {page: null, expect: 1},
                {page: undefined, expect: 1},
                {page: "", expect: 1},
                {page: "fake", expect: 1},
                {page: 0, expect: 1},
                {page: -1, expect: 1},
                {page: 5.5, expect: 1},
                {page: true, expect: 1},
                {page: false, expect: 1},
                {page: {}, expect: 1},
                {page: 1, expect: 1},
                {page: 2, expect: 2},
            ]
    
            arrange.forEach((i) => {
                expect(new SearchParams({page: i.page as any}).page).toBe(i.expect)
            })
        })
    
        test('per_page prop', () => {
            const params = new SearchParams()
            expect(params.per_page).toBe(15)
    
            const arrange = [
                {per_page: null, expect: 15},
                {per_page: undefined, expect: 15},
                {per_page: "", expect: 15},
                {per_page: "fake", expect: 15},
                {per_page: 0, expect: 15},
                {per_page: -1, expect: 15},
                {per_page: 5.5, expect: 15},
                {per_page: true, expect: 15},
                {per_page: false, expect: 15},
                {per_page: {}, expect: 15},
                {per_page: 1, expect: 1},
                {per_page: 2, expect: 2},
                {per_page: 10, expect: 10},
            ]
    
            arrange.forEach((i) => {
                expect(new SearchParams({per_page: i.per_page as any}).per_page).toBe(i.expect)
            })
        })
    
        test('sort prop', () => {
            const params = new SearchParams()
            expect(params.sort).toBeNull()
    
            const arrange = [
                {sort: null, expect: null},
                {sort: undefined, expect: null},
                {sort: "", expect: null},
                {sort: 0, expect: "0"},
                {sort: -1, expect: "-1"},
                {sort: 5.5, expect: "5.5"},
                {sort: true, expect: "true"},
                {sort: false, expect: "false"},
                {sort: {}, expect: "[object Object]"},
                {sort: "field", expect: "field"},
            ]
    
            arrange.forEach((i) => {
                expect(new SearchParams({sort: i.sort as any}).sort).toBe(i.expect)
            })
        })
    
        test('sort_dir prop', () => {
            let params = new SearchParams()
            expect(params.sort_dir).toBeNull()
    
            params = new SearchParams({sort: null})
            expect(params.sort_dir).toBeNull()
    
            params = new SearchParams({sort: undefined})
            expect(params.sort_dir).toBeNull()
    
            params = new SearchParams({sort: ""})
            expect(params.sort_dir).toBeNull()
    
            const arrange = [
                {sort_dir: null, expect: "asc"},
                {sort_dir: undefined, expect: "asc"},
                {sort_dir: "", expect: "asc"},
                {sort_dir: 0, expect: "asc"},
                {sort_dir: "fake", expect: "asc"},
                
                {sort_dir: "asc", expect: "asc"},
                {sort_dir: "ASC", expect: "asc"},
                {sort_dir: "desc", expect: "desc"},
                {sort_dir: "DESC", expect: "desc"},
            ]
    
            arrange.forEach((i) => {
                expect(new SearchParams({sort: "field", sort_dir: i.sort_dir as any}).sort_dir).toBe(i.expect)
            })
        })
    
        test('filter prop', () => {
            const params = new SearchParams()
            expect(params.filter).toBeNull()
    
            const arrange = [
                {filter: null, expect: null},
                {filter: undefined, expect: null},
                {filter: "", expect: null},
                {filter: 0, expect: "0"},
                {filter: -1, expect: "-1"},
                {filter: 5.5, expect: "5.5"},
                {filter: true, expect: "true"},
                {filter: false, expect: "false"},
                {filter: {}, expect: "[object Object]"},
                {filter: "field", expect: "field"},
            ]
    
            arrange.forEach((i) => {
                expect(new SearchParams({filter: i.filter as any}).filter).toBe(i.expect)
            })
        })
    })
    
    describe("SearchResult unit test", () => {
        test("constructor prop", () => {
            let result = new SearchResult({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null
            })
    
            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: null,
                sort_dir: null,
                filter: null
            })
    
            result = new SearchResult({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test"
            })
    
            expect(result.toJSON()).toStrictEqual({
                items: ["entity1", "entity2"] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                last_page: 2,
                sort: "name",
                sort_dir: "asc",
                filter: "test"
            })
        })
    
        it("should set last_page = 1 when per_page field is greater than total field", () => {
            let result = new SearchResult({
                items: [] as any,
                total: 4,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null
            })
    
            expect(result.last_page).toBe(1)
        })
    
        test("last_page prop when total is not a multiple of per_page", () => {
            let result = new SearchResult({
                items: [] as any,
                total: 101,
                current_page: 1,
                per_page: 20,
                sort: null,
                sort_dir: null,
                filter: null
            })
    
            expect(result.last_page).toBe(6)
        })
    })
})

