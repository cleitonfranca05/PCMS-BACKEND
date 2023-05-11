import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateMessage } from './dto/create-message.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly httpService: HttpService,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'email'],
    });
  }
  async findOneOrFail(options?: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id: id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }
  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id: id } });
    this.usersRepository.softDelete({ id });
  }

  async sendMessage(data: CreateMessage): Promise<any> {
    const dados = data;

    const m_data = { id: dados.telephone, message: dados.message };
    const url = '';
    const config = {
      params: { key: data.key_whats },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '',
      },
    };
    const response = await this.httpService
      .post(url, m_data, config)
      .pipe(map((response) => response.status));
    return response;
  }
}
