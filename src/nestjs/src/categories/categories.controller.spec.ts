import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-videos/category/application';
import { SortDirection } from '@fc/micro-videos/dist/@seedwork/domain/repository/repository-contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockcreateUsecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller['createUseCase'] = mockcreateUsecase;

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.create(input);
    expect(mockcreateUsecase.execute).toBeCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should updates a category', async () => {
    const id = '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id: id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockeUpdateUsecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller['updateUseCase'] = mockeUpdateUsecase;

    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.update(id, input);
    expect(mockeUpdateUsecase.execute).toBeCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should deletes a category', async () => {
    const expectedOutput = undefined;
    const mockeDeleteUsecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller['deleteUseCase'] = mockeDeleteUsecase;

    const id = '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockeDeleteUsecase.execute).toBeCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a category', async () => {
    const id = '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8';

    const expectedOutput: GetCategoryUseCase.Output = {
      id: id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockeGetUsecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller['getUseCase'] = mockeGetUsecase;

    const output = await controller.findOne(id);
    expect(mockeGetUsecase.execute).toBeCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should list a category', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '398e2dc0-f85e-4ae7-881d-ea9abc1b83f8',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    };
    const mockeListUsecase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller['listUseCase'] = mockeListUsecase;

    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };

    const output = await controller.search(searchParams);
    expect(mockeListUsecase.execute).toBeCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
});
