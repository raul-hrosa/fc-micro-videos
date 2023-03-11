import { SearchInputDto } from '../../../@seedwork/application/dto/search-input';
import { PaginationOutPutDto, PaginationOutputMapper } from '../../../@seedwork/application/dto/pagination-output';
import {default as DefaultUseCase} from '../../../@seedwork/application/use-case';
import CategoryRespository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';

export namespace ListCategoriesUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRespository.Repository){}
        
        async execute(input: Input): Promise<Output>{
            const params =  new CategoryRespository.SearchParams(input)
            const searchResult = await this.categoryRepo.search(params)
            return this.toOutput(searchResult)
        }
    
        private toOutput(searchResult: CategoryRespository.SearchResult): Output{
            const items = searchResult.items.map((i) => CategoryOutputMapper.toOutput(i))
            const pagination = PaginationOutputMapper.toOutput(searchResult)
            return {
               items,
                ...pagination
            }
        }
    }
    
    export type Input = SearchInputDto
    
    export type Output = PaginationOutPutDto<CategoryOutput>
}

export default ListCategoriesUseCase
