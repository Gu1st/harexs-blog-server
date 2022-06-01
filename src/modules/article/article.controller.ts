import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './interface/interface';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Get('list')
  getMore() {
    return '文章列表';
  }
  @Get('info')
  getOne(@Query() id: string) {
    return '文章详情' + JSON.stringify(id);
  }
  @Post('create')
  create(@Body() article: Article) {
    return '创建文章' + JSON.stringify(article);
  }
  @Delete('delete')
  delete(@Query() id: string) {
    return '删除文章' + JSON.stringify(id);
  }
}
