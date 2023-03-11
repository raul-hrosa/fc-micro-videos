import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error';
import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import CategoryValidatorFactory from '../validators/category.validator';

export type CategoryProps = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}   

export class Category extends Entity<CategoryProps> {
    constructor (public readonly props: CategoryProps, id?: UniqueEntityId) {
        Category.validate(props)
        super(props, id);
        this.description = this.props.description
        this.is_active = this.props.is_active
        this.props.created_at = this.props.created_at ?? new Date()
    }
    
    update(name: string, description: string): void {
        Category.validate({ name,  description })
        this.name = name
        this.description = description
    }

    //static validate(props: Omit<CategoryProps, "created_at">) {
    //    ValidatorRules.values(props.name, "name").required().string().maxLength(255)
    //    ValidatorRules.values(props.description, "description").string()
    //   ValidatorRules.values(props.is_active, "is_active").boolean()
    //}

    static validate(props: CategoryProps) {
        const validator = CategoryValidatorFactory.create()
        const isValid = validator.validate(props)
        if(!isValid) {
            throw new EntityValidationError(validator.errors);            
        }
    }

    activate() {
        this.props.is_active = true
    }

    deactivate() {
        this.props.is_active = false
    }
    
    get name() {
        return this.props.name
    }
    
    private set name(value : string) {
        this.props.name = value
    }  

    get description() {
        return this.props.description
    }

    private set description(value:string) {
        this.props.description = value ?? null
    }
    
    get is_active() {
        return this.props.is_active
    }

    private set is_active(value: boolean) {
        this.props.is_active = value ?? true
    }

    get created_at() {
        return this.props.created_at
    }
}