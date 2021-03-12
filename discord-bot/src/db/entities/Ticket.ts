import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type: string;

  @Column()
  owner: string;

  @Column()
  channelId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
