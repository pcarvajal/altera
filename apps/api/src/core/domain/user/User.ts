import { AggregateRoot, UserId } from 'shared';
import { UserScalar } from './UserScalar';
import { UserIdMissingError } from './errors/UserdMissingError';
import { UserName } from './value-objects/UserName';
import { UserEmail } from './value-objects/UserEmail';
import { UserPassword } from './value-objects/UserPassword';
import { UserRole } from './value-objects/UserRole';

export class User extends AggregateRoot {
  private id: UserId;
  private name: UserName;
  private email: UserEmail;
  private password: UserPassword;
  private role: UserRole;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    role: UserRole
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static create(scalars: UserScalar): User {
    if (!scalars.id) throw new UserIdMissingError();
    return new User(
      new UserId({ value: scalars.id }),
      new UserName({ value: scalars.name }),
      new UserEmail({ value: scalars.email }),
      UserPassword.fromPlain(scalars.password),
      new UserRole({ value: scalars.role })
    );
  }

  toScalars(): UserScalar {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value
    };
  }

  static fromScalars(scalars: UserScalar): User {
    if (!scalars.id) throw new UserIdMissingError();
    return new User(
      new UserId({ value: scalars.id }),
      new UserName({ value: scalars.name }),
      new UserEmail({ value: scalars.email }),
      UserPassword.fromHash(scalars.password),
      new UserRole({ value: scalars.role })
    );
  }
}
