import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PortfolioImage } from "./PortfolioImage";

@ObjectType()
@Entity()
export class PortfolioItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  shareableUrl: string;

  @OneToMany(() => PortfolioImage, (image) => image.portfolioItem)
  images: PortfolioImage[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
