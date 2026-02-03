import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmployeesModule,],
})
export class AppModule {}
