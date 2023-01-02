import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UserRepository } from '../domain/UserRepository';
import { UserFactory } from '../domain/UserFactory';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(userDTO: CreateUserDTO): Promise<void> {
    const user = UserFactory.createNewUser(
      userDTO.name,
      userDTO.email,
      userDTO.password,
    );
    await this.userRepository.save(user);
  }
}
