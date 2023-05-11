import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessage {
  @IsNumber()
  @IsNotEmpty()
  telephone: number;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  key_whats: string;
}
