import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class WebAiService {
  private readonly openai: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
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
    console.log('response chat-gpt: ', response.data.choices);
      if (data.choices.length) {
        return data.choices;
      }
      return response.data;
    } catch (error) {
      console.error('error', error);
    }
  }
}
