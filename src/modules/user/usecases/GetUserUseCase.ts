import { Injectable } from '@nestjs/common';
import { UserFactory } from '../domain/UserFactory';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}
