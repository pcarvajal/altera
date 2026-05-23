import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserScalar } from '../../core/domain/user/UserScalar';

@Entity({ name: 'users' })
export class UserEntity implements UserScalar {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name!: string;
  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email!: string;
  @Column({ name: 'password', type: 'varchar', length: 255 })
  password!: string;
  @Column({ name: 'role', type: 'varchar', length: 50 })
  role!: string;
}
