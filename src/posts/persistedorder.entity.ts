import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersistedOrder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public eventName: string;

  @Column()
  public messageId: string;
}
