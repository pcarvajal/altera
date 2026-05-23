import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user.entity';
import { User } from '../../core/domain/user/User';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../core/domain/user/ports/outputs/UserRepository';
import { Nullable } from 'shared';
import { UserEmail } from '../../core/domain/user/value-objects/UserEmail';
@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async save(user: User): Promise<User> {
    const scalars = user.toScalars();
    const hashedPassword = await bcrypt.hash(scalars.password, 10);
    await this.repository.save({ ...scalars, password: hashedPassword });
    return user;
  }

  async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    const userEntity = await this.repository.findOne({ where: { email: email.value } });
    if (!userEntity) return null;
    return User.fromScalars(userEntity);
  }
}
