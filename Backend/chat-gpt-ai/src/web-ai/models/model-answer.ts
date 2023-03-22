import { IsNotEmpty, IsString } from "class-validator";

export class ModelAnswer {
  @IsString()
  @IsNotEmpty()
  question: string;
}
