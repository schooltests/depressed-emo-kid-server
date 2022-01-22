import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class GraphService {
  constructor(private readonly httpService: HttpService) {}

  async getGraphData() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population'),
      );
      return { result: data, message: 'ok' };
    } catch (error) {
      console.error(error);
      return {
        message: 'error',
        result: null,
      };
    }
  }
}
