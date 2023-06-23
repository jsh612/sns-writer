import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai';

const GPT_MODEL = 'gpt-3.5-turbo-16k-0613';

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
    title?: string,
  ): Promise<ChatCompletionResponseMessage> {
    try {
      const realPrompt = `Please write a blog post about ${prompt} in detail. title is "${title}". There should be made up with introduction, including subtopics, conclusion. each subtopics must more than 5000 words. response in English and it made up with html.  If you have any questions related to programming, your answer must have example code with <pre><code> tags. Please write a answer with a new line in the same format as "abc\\n" + "def"`;
      const messages: ChatCompletionRequestMessage[] = [
        {
          role: 'user',
          content: realPrompt,
          name: chatUserName,
        },
      ];
      const completion = await this.openai.createChatCompletion({
        messages: messages,
        model: GPT_MODEL,
        temperature: 1,
      });

      console.log(
        'completion.data.choices[0].message',
        completion.data.choices[0].message,
      );
      messages.push(completion.data.choices[0].message, {
        role: 'system',
        content: `답변을 다음 JSON 포맷에 맞도록 입력해주고, content 필드는 한국어로 번역해주고 html 태그 형태로 작성해줘. {title: 제목, titleEn: "title in english", tag: 'comma로 구분된 10개의 키워드', content: 'content'}`,
        name: 'system',
      });
      const translatedCompletion = await this.openai.createChatCompletion({
        messages: messages,
        model: GPT_MODEL,
        temperature: 1,
      });
      console.log(
        'translatedCompletion.data.choices[0].message------>',
        translatedCompletion.data.choices[0].message,
      );
      return translatedCompletion.data.choices[0].message;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createSubject(prompt: string): Promise<ChatCompletionResponseMessage> {
    try {
      const realPrompt = `Please make ${this.configService.get<string>(
        'POST_COUNT',
      )} blogging topics about ${prompt}.`;

      const completion = await this.openai.createChatCompletion({
        messages: [
          { role: 'user', content: realPrompt },
          {
            role: 'system',
            content: `답변을 다음 JSON 포맷에 맞도록 입력해줘. 답변에 escape문자가 있으면 그 문자를 JSON 데이터에 적합하도록 처리해줘. [{title: 제목1}, {title: 제목2}, ...]`,
            name: 'system',
          },
        ],
        model: GPT_MODEL,
        temperature: 1,
      });

      return completion.data.choices[0].message;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
