import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PagesService } from "./pages.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Master Pages')
@Controller("master/pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() dto: CreatePageDto) {
    return this.pagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePageDto) {
    return this.pagesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pagesService.remove(id);
  }
}
