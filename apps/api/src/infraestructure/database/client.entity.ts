import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClientScalar } from '../../core/domain/client/ClientScalar';

@Entity({ name: 'clients' })
export class ClientEntity implements ClientScalar {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name!: string;
}
