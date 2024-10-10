import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
    
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;
    const totalPage =await this.product.count({where: {available: true}});
    const lastPage = Math.ceil(totalPage / limit);
    return {
      data: await this.product.findMany({
        where: {
          available: true
        },
        skip: skip,
        take: limit,
        
      }),
     metadata:{
      totalPage: totalPage,
      currentPage: page,
      perPage: limit,
      lastPage: lastPage
     }
    }

  }

  async findOne(id: number) {
    const product =await  this.product.findUnique({
      where: {
        id,
        available: true

      }
    })
    if(!product){
      throw new NotFoundException('Product not found')
    }
    return product
  }

  async update(updateProductDto: UpdateProductDto) {
    const id = updateProductDto.id;
    await this.findOne(id)
    return this.product.update({
      where: {
        id,
        available: true
      },
      data: updateProductDto
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.update({
      id,
      available: false,
      deletedAt: new Date()
    })
    
  }
}
