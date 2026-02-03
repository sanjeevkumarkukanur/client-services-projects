import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findById(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }
}
