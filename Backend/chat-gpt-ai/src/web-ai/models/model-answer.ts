import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ModelAnswer {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Este campo es requerido',
  })
  question: string;
}

export class ModelUser {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Este campo es requerido',
  })
  name: string;
}