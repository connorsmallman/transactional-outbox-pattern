import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userDTO: CreateUserDTO): Promise<void> {
    const user = await this.userRepository.create(userDTO);
    await this.userRepository.save(user);
  }
}
