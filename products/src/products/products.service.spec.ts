import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';

const productsArray = [
  {
    productName: 'CD',
    quantity: 5,
  },
  {
    productName: 'DVD',
    quantity: 0,
  },
];

const oneProduct = {
  productName: 'CD',
  quantity: 5,
};

const oneUserUpdate = {
  productName: 'CD',
  quantity: 15,
  productID: '1',
};

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue(productsArray),
            findOneBy: jest.fn().mockResolvedValue(oneProduct),
            save: jest.fn().mockResolvedValue(oneProduct),
            remove: jest.fn(),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(oneUserUpdate),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a products', () => {
      expect(
        service.create({
          productName: 'CD',
          quantity: 5,
        }),
      ).resolves.toEqual(oneProduct);
    });
  });

  describe('findAll()', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll();
      expect(products).toEqual(productsArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single product', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('1')).resolves.toEqual(oneProduct);
      expect(repoSpy).toBeCalledWith({ productID: '1' });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should successfully update the products', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      const findOneBy = jest.spyOn(repository, 'findOneBy');

      findOneBy.mockResolvedValue(oneUserUpdate);

      const payload = {
        productName: 'CD',
        quantity: 15,
      };
      const retValue = await service.update('1', payload);

      expect(updateSpy).toBeCalledWith('1', payload);
      expect(retValue).toEqual(oneUserUpdate);
    });
  });
});
