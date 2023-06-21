import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DrawingService {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get('CHAT_GPT_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async createImage(question = '') {
    const response = await this.openai.createImage({
      prompt: question,
      response_format: 'b64_json',
      size: '512x512',
      n: 1,
    });
    console.log(response.data.data, response.data.data[0]);
    return response.data.data[0].b64_json;
  }
}
