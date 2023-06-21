import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private openai: OpenAIApi;
  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get('CHAT_GPT_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async createChatCompletion(
    prompt: string,
    chatUserName: string,
  ): Promise<ChatCompletionResponseMessage> {
    try {
      const realPrompt = `Please write a blog post about ${prompt} in detail. title is "for ${prompt}". Please answer at least 1500 characters long. There should be more than five subtopics. response in korean and it made up with html`;

      const completion = await this.openai.createChatCompletion({
        messages: [
          { role: 'user', content: realPrompt, name: chatUserName },
          {
            role: 'system',
            content: `답변을 다음 JSON 포맷에 맞도록 입력해줘. {title: 제목, titleEn: "title in english", tag: 'comma로 구분된 10개의 키워드', content: 'Answers made up of search engine-optimized Semantic html'}`,
            name: 'system',
          },
        ],
        model: 'gpt-3.5-turbo-0613',
        // functions: [
        //   {
        //     name: 'htmlFormatter',
        //     description: 'html formatter',
        //     parameters: {
        //       type: 'object',
        //       properties: {
        //         content: {
        //           type: 'string',
        //           description: 'contents convert to SEO semantic html.',
        //         },
        //       },
        //       required: ['content'],
        //     },
        //   },
        // ],
        // function_call: 'auto',
        temperature: 0.5,
      });

      return completion.data.choices[0].message;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
