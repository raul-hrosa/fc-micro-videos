import { 
    SearchableRepositoryInterface, 
    SearchParams as DefaultSearchParams, 
    SearchResult as DefaultSearchResuls
} from '../../../@seedwork/domain/repository/repository-contracts';
import {Category} from '../entities/category';

export namespace CategoryRespository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {}

    export class SearchResult extends DefaultSearchResuls<Category, Filter> {}

    export  interface Repository 
        extends SearchableRepositoryInterface<
            Category,
            Filter, 
            SearchParams, 
            SearchResult
        > {}
}

export default CategoryRespository;
