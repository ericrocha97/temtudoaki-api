import { Inject, Injectable } from '@nestjs/common';
import { resultDto } from 'src/dto/result.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { serviceCreateDto } from './dto/service.create.dto';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: Repository<Service>
  ) { }

  async create(data: serviceCreateDto, user: User): Promise<resultDto> {
    const service = new Service();
    service.title = data.title;
    service.description = data.description;
    service.user = user;
    return this.serviceRepository.save(service)
      .then((result) => {
        return <resultDto>{
          status: true,
          message: "Serviço cadastrado com sucesso"
        }
      })
      .catch((error) => {
        console.error(error)
        return <resultDto>{
          status: false,
          message: `Erro ao cadastrar serviço: ${error.toString()}`
        }
      })

  }
}
