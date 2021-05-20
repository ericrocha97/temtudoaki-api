import { Injectable, Inject } from '@nestjs/common';
import { resultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { userCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: userCreateDto): Promise<resultDto> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = bcrypt.hashSync(data.password, 8);
    user.cpf = data.cpf;
    user.phone = data.phone;
    return this.userRepository.save(user)
      .then((result) => {
        return <resultDto>{
          status: true,
          message: "Usuário cadastrado com sucesso"
        }
      })
      .catch((error) => {
        console.error(error)
        return <resultDto>{
          status: false,
          message: `Erro ao cadastrar usuário: ${error.toString()}`
        }
      })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }
}