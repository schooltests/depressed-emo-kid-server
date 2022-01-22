import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateCommentModel } from 'src/contracts/proxy-sa';

@Injectable({ scope: Scope.REQUEST })
export class ProxySAService {
  private readonly baseUrl = 'http://denver.sensearena.com/api';
  constructor(private readonly httpService: HttpService) {}

  async getArticlesList(page: number) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.baseUrl}/v1/articles?page=${page}`));
      return data;
    } catch (error) {
      console.error(error);
      return {
        message: 'error',
        result: [],
      };
    }
  }
  async getArticleByUUID(uuid: string) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.baseUrl}/v1/article/${uuid}`));
      return data;
    } catch (error) {
      console.error(error);
      return {
        message: 'error',
        result: null,
      };
    }
  }
  async getArticleComments(uuid: string) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`${this.baseUrl}/v1/article/${uuid}/comments`));
      return data;
    } catch (error) {
      console.error(error);
      return {
        message: 'error',
        result: [],
      };
    }
  }
  async createComment(uuid: string, data: CreateCommentModel) {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.post<{ message: string }>(`${this.baseUrl}/v1/article/${uuid}`, {
          email: data.email,
          last_name: data.lastName,
          first_name: data.firstName,
          message: data.message,
        }),
      );
      return response;
    } catch (error) {
      console.error(error);
      return {
        message: 'error',
      };
    }
  }
}
