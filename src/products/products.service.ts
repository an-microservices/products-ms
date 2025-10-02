import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const totalPages = await this.product.count({ where: { availabe: true } });
    const lastPage = Math.ceil(totalPages / limit);

    const products = await this.product.findMany({
      where: { availabe: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: products,
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.product.findUnique({
      where: { id, availabe: true },
    });

    if (!product)
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: {
        availabe: false,
      },
    });

    return product;
  }
}
