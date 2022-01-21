import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/proxy-sa.model';
import { ProxySAService } from './proxy-sa.service';

@ApiTags('Proxy sa')
@Controller('api/proxy-sa/article')
export class ProxySAController {
  constructor(private readonly sa: ProxySAService) {}

  @Get()
  getArticlesList(@Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) page: number) {
    return this.sa.getArticlesList(page);
  }

  @Get('/:uuid')
  getArticle(@Param('uuid') uuid: string) {
    return this.sa.getArticleByUUID(uuid);
  }

  @Get('/:uuid/comments')
  getComments(@Param('uuid') uuid: string) {
    return this.sa.getArticleComments(uuid);
  }

  @Post('/:uuid/comment')
  createComment(@Param('uuid') uuid: string, @Body() model: CreateCommentDTO) {
    return this.sa.createComment(uuid, model);
  }
}
