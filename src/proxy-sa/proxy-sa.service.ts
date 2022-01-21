import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateCommentModel } from 'src/contracts/proxy-sa';

@Injectable()
export class ProxySAService {
  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.defaults.baseURL = 'http://denver.sensearena.com/api';
  }

  async getArticlesList(page: number) {
    try {
      const { data } = await firstValueFrom(this.httpService.get(`/v1/articles?page=${page}`));
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
      const { data } = await firstValueFrom(this.httpService.get(`/v1/article/${uuid}`));
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
      const { data } = await firstValueFrom(this.httpService.get(`/v1/article/${uuid}/comments`));
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
        this.httpService.post<{ message: string }>(`/v1/article/${uuid}`, {
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
