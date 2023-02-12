import { CategoryRespository } from '../../domain/repository/category.repository';
import Category from '../../domain/entities/category'
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import UseCase from '../../../@seedwork/application/use-case';

export default class UpdateCategoryUseCase implements UseCase<Input, Output>{
   
    constructor(private categoryRepo: CategoryRespository.Repository){}

    async execute(input: Input): Promise<Output>{
        const entity = await this.categoryRepo.findById(input.id)
        entity.update(input.name, input.description)

        if(input.is_active === true){
            entity.activate();
        }

        if(input.is_active === false){
            entity.deactivate();
        }

        await this.categoryRepo.update(entity)
        return CategoryOutputMapper.toOutput(entity)
    }
}

export type Input = {
    id: string, 
    name: string,
    description?: string,
    is_active?: boolean
}

export type Output = CategoryOutput