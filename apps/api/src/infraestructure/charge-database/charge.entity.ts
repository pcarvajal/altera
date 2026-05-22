import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'charges' })
export class ChargeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;
  @Column({ name: 'ref', type: 'varchar', length: 255 })
  ref!: string;
  @Column({ name: 'client_id', type: 'uuid' })
  clientId!: string;
  @Column({ name: 'generation_date', type: 'timestamp' })
  generationDate!: Date;
  @Column({ name: 'state', type: 'varchar', length: 100 })
  state!: string;
  @Column({ name: 'reject_details', type: 'text' })
  rejectDetails!: string;
}
