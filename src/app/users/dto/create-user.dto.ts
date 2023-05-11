import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usu�rio',
    example: 'Paulo',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do usu�rio',
    example: 'Muzzy',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'email do usu�rio',
    example: 'paulomuzzy@pcms.com.br',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  key_whats: string;

  @ApiProperty({
    description: 'senha utilizada para login',
    example: 'Abc@123',
  })
  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
