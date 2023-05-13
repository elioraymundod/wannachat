import { HttpException, Injectable } from '@nestjs/common';
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  ChatCompletionRequestMessage,
  CreateModerationRequest,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessageRoleEnum,
  UserRequestMessage,
} from 'openai';
import { getTokens } from './lib/tokenizer';
import { UserRepository } from './repositories/user-repository';
const DEFAULT_MODEL_ID = 'text-davinci-003';
const MODEL_ID_TURBO = 'gpt-3.5-turbo';
const DEFAULT_TEMPERATURE = 0.6;
const NAME_BOT = 'Wanna Bot';
const API_CHAT = 'https://api.openai.com/v1/chat';
@Injectable()
export class WebAiService {
  private openai: OpenAIApi;
  private OPENAI_KEY = process.env.OPENAI_API_KEY;

  constructor(private userRepository: UserRepository) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: this.OPENAI_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  /**
   * It takes a question and a temperature as parameters, and returns a response from the OpenAI API
   * @param {string} question - The question you want to ask the model.
   * @param {number} [temperature] - A float value controlling randomness in boltzmann distribution.
   * The higher the value, the more random the text. Defaults to 0 (argmax sampling).
   * @returns The response from the OpenAI API.
   */
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
      //console.error('error message', error);
      return error;
    }
  }

  /**
   * @description The function takes in a role and a question, and returns a model answer
   * @param {ChatCompletionRequestMessageRoleEnum} role - *system/user/assistant*
   * @param {string} content - The question that the user is asking.
   * @returns The model answer for the question
   */
  async askQuestionUser(
    role: ChatCompletionRequestMessageRoleEnum,
    content: string,
  ) {
    try {
      return await this.getModelAnswerChat(role, content);
    } catch (error) {
      //console.error('error en askQuestionUser');
      return error;
    }
  }

  /**
   * @description It takes a role and a content, and returns a response
   * @param {ChatCompletionRequestMessageRoleEnum} role - *system/user/assistant*
   * @param {string} content - The text of the message.
   * @returns The return is a string with the response of the bot.
   */
  async getModelAnswerChat(
    role: ChatCompletionRequestMessageRoleEnum,
    content: string,
  ) {
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
        return 'palabra inapropiada';
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


   /**
   * @description The function takes in a role and a question, and returns a model answer
   * @param {ChatCompletionRequestMessageRoleEnum} role - *system/user/assistant*
   * @param {string} idUsuario - Id user
   * @returns The model answer for the question
   */
   async getUser(
    idUsuario: string,
  ) {
    try {
      return await this.getUserById(idUsuario);
    } catch (error) {
      //console.error('error en askQuestionUser');
      return error;
    }
  }



  /**
   * @description It takes an ID, and returns a response
   * @param {string} content - The text of the message.
   * @returns The return is a string with the name of the user
   */
  async getUserById(
    user: string,
  ) {
    return await this.userRepository.getUser(user);
  }
}
