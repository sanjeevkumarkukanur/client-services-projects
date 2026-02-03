import { Injectable, BadRequestException } from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly repo: EmployeesRepository) {}

  async create(dto: CreateEmployeeDto) {
    if (dto.salary <= 0) {
      throw new BadRequestException('Salary must be greater than zero');
    }

    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }
}
