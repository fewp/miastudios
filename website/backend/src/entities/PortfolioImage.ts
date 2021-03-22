import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PortfolioItem } from "./PortfolioItem";

@ObjectType()
@Entity()
export class PortfolioImage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  portfolioItemId: number;

  @ManyToOne(() => PortfolioItem, (portfolioItem) => portfolioItem.images, {
    onDelete: "CASCADE",
  })
  portfolioItem: PortfolioItem;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
