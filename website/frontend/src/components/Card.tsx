import NextLink from "next/link";
import React from "react";
import styles from "../../public/css/components/Card.module.css";
import Icon from "./Icon";

interface CardProps {
  name: string;
  text: string;
}

export const Card: React.FC<CardProps> = ({ name, text }) => {
  return (
    <NextLink href={name}>
      <div className={styles.cardContainer}>
        <div>
          <Icon name={name} />
        </div>
        <h1>{name}</h1>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </NextLink>
  );
};
