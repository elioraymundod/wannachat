import { HttpException, Injectable } from '@nestjs/common';
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  ChatCompletionRequestMessage,
  CreateModerationRequest,
  CreateChatCompletionRequest,
} from 'openai';
import { getTokens } from './lib/tokenizer';
const DEFAULT_MODEL_ID = 'text-davinci-003';
const MODEL_ID_TURBO = 'gpt-3.5-turbo';
const DEFAULT_TEMPERATURE = 0.6;
const NAME_BOT = 'Wanna Bot';
const API_CHAT = 'https://api.openai.com/v1/chat';
@Injectable()
export class WebAiService {
  private openai: OpenAIApi;
  private OPENAI_KEY = process.env.OPENAI_API_KEY;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: this.OPENAI_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getModelAnswer(question: string, temperature?: number) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: DEFAULT_MODEL_ID,
        temperature: temperature ? temperature : DEFAULT_TEMPERATURE,
      };
      const response = await this.openai.createCompletion(params);
      const { data } = response;
      //console.log('response chat-gpt: ', response.data.choices);
      if (data.choices.length) {
        return data.choices;
      }
      return response.data;
    } catch (error) {
      console.error('error message', error);
    }
  }

  async startChat(nombre: string) {
    const role = 'assistant';
    const content = `Buen día ${nombre} es un gusto saludarte`;
    try {
      return await this.getModelAnswerChat(role, content);
    } catch (error) {
      //console.error('error en startChat');
      return error;
    }
  }

  async askQuestionUser(question: string) {
    const role = 'user';
    try {
      return await this.getModelAnswerChat(role, question);
    } catch (error) {
      //console.error('error en askQuestionUser');
      return error;
    }
  }

  async getModelAnswerChat(role: any, content: string) {
    try {
      const reqMessages: ChatCompletionRequestMessage[] = [{ role, content }];
      if (!reqMessages) {
        throw new Error('no messages provided');
      }
      let tokenCount = 0;
      reqMessages.forEach((msg) => {
        const tokens = getTokens(msg.content);
        tokenCount += tokens;
      });
      const paramsModeration: CreateModerationRequest = {
        input: reqMessages[reqMessages.length - 1].content,
      };
      const moderationRes = await this.openai.createModeration(
        paramsModeration,
      );
      const moderationData = moderationRes.data;
      const [results] = moderationData.results;
      //console.log('results', results);
      if (results.flagged) {
        // throw new Error('palabra inapropiada');
        //return 'palabra inapropiada';
      }
      const prompt = `Eres asistente IA personalizado para ayudar a comprar zapatos. Tu nombre es ${NAME_BOT}:
    `;
      tokenCount += getTokens(prompt);

      if (tokenCount >= 4000) {
        throw new Error('Query too large');
      }
      const messages: ChatCompletionRequestMessage[] = [
        { role: 'system', content: prompt },
        ...reqMessages,
      ];
      //console.log('messages', messages);
      const paramsCompletation: CreateChatCompletionRequest = {
        model: MODEL_ID_TURBO,
        messages,
        temperature: DEFAULT_TEMPERATURE,
      };
      const newConfiguration = new Configuration({
        organization: process.env.ORGANIZATION_ID,
        apiKey: this.OPENAI_KEY,
        basePath: API_CHAT,
      });
      const openConection = new OpenAIApi(newConfiguration);
      const response = await openConection.createCompletion(paramsCompletation);
      const { data } = response;
      //console.log('response chat-gpt: ', data);
      if (data.choices.length) {
        //console.log('response chat-gpt: ', data.choices);
        return data.choices;
      }
      return data;
    } catch (error) {
      //console.error('******* ERROR *****', error);
      // console.error('******* ERROR MESSAGE *********', error.message);
      // console.error('******* ERROR NAME *********', error.name);
      // console.error('******* ERROR STATUS *****', error.response.status);
      // console.error(
      //   '******* ERROR STATUS TEXT *****',
      //   error.response.statusText,
      // );
      // console.error(
      //   '******* ERROR DATA MESSAGE *****',
      //   error.response.data.error.message,
      // );
      //const name = error.name ?? 'Error Desconocido';
      const messages = error.message ?? 'Internal server error';
      const status = error.response.status ?? 500;
      const description =
        error.response.data.error.message ??
        'No se pudo recuperar error message';

      //return error;
      throw new HttpException(messages, status, {
        description,
      });
    }
  }
}
