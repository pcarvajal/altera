import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ChargeScalar } from '../../core/domain/charge/ChargeScalar';
import { ClientEntity } from './client.entity';

@Entity({ name: 'charges' })
export class ChargeEntity implements ChargeScalar {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;
  @Column({ name: 'reference', type: 'varchar', length: 255 })
  reference!: string;
  @JoinColumn({ name: 'client_id' })
  @OneToOne(() => ClientEntity, { eager: true })
  clientId!: string;
  @Column({ name: 'generation_date', type: 'timestamp' })
  generationDate!: Date;
  @Column({ name: 'state', type: 'varchar', length: 100 })
  state!: string;
  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount!: number;
  @Column({ name: 'reject_details', type: 'text' })
  rejectDetails!: string;
  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;
}
