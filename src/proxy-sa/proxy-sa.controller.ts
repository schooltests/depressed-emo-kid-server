import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/proxy-sa.model';
import { GraphService } from './graph.service';
import { ProxySAService } from './proxy-sa.service';

@ApiTags('Proxy sa')
@Controller('api/proxy-sa')
export class ProxySAController {
  constructor(private readonly sa: ProxySAService, private readonly g: GraphService) {}

  @Get('/articles')
  getArticlesList(@Query('page', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) page: number) {
    return this.sa.getArticlesList(page);
  }

  @Get('/article/:uuid')
  getArticle(@Param('uuid') uuid: string) {
    return this.sa.getArticleByUUID(uuid);
  }

  @Get('/article/:uuid/comments')
  getComments(@Param('uuid') uuid: string) {
    return this.sa.getArticleComments(uuid);
  }

  @Post('/article/:uuid/comment')
  createComment(@Param('uuid') uuid: string, @Body() model: CreateCommentDTO) {
    return this.sa.createComment(uuid, model);
  }

  @Get('/graph')
  getGraphData() {
    return this.g.getGraphData();
  }
}
