import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from './order.entity';
import { OrdersService } from './orders.service';
import { Repository } from 'typeorm';

const orderArray = [
  {
    orderID: 'orderID #1',
    isCancelled: true,
  },
  {
    orderID: 'orderID #2',
    isCancelled: false,
  },
];

const oneOrder = {
  orderID: 'orderID #1',
  isCancelled: true,
};

const oneOrderUpdate = {
  orderID: 'orderID #1',
  isCancelled: false,
};

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Orders>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Orders),
          useValue: {
            find: jest.fn().mockResolvedValue(orderArray),
            findOneBy: jest.fn().mockResolvedValue(oneOrder),
            save: jest.fn().mockResolvedValue(oneOrder),
            remove: jest.fn(),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(oneOrderUpdate),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Orders>>(getRepositoryToken(Orders));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(
        service.create({
          orderID: 'orderID #1',
          isCancelled: true,
        }),
      ).resolves.toEqual(oneOrder);
    });
  });

  describe('findAll()', () => {
    it('should return an array of orders', async () => {
      const orders = await service.findAll();
      expect(orders).toEqual(orderArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single orders', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('1')).resolves.toEqual(oneOrder);
      expect(repoSpy).toBeCalledWith({ orderID: '1' });
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
    it('should successfully update the order', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      const findOneBy = jest.spyOn(repository, 'findOneBy');

      findOneBy.mockResolvedValue(oneOrderUpdate);

      const payload = {
        orderID: 'orderID #1',
        isCancelled: false,
      };
      const retValue = await service.update('1', payload);

      expect(updateSpy).toBeCalledWith('1', payload);
      expect(retValue).toEqual(oneOrderUpdate);
    });
  });
});
