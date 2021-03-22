import NextLink from "next/link";
import React from "react";
import styles from "../../public/css/components/Socials.module.css";
import Icon from "./Icon";

interface SocialsProps {
  css?: string;
}

export const Socials: React.FC<SocialsProps> = ({ css }) => {
  const content = (
    <>
      <NextLink href="https://discord.gg/jWR9Nem">
        <div>
          <Icon name="discord" />
        </div>
      </NextLink>
      <NextLink href="https://twitter.com/Mia_Studios">
        <div>
          <Icon name="twitter" />
        </div>
      </NextLink>
      <NextLink href="https://www.youtube.com/miastudios">
        <div>
          <Icon name="youtube" />
        </div>
      </NextLink>
      <NextLink href="https://instagram.com">
        <div>
          <Icon name="instagram" />
        </div>
      </NextLink>
    </>
  );
  return <div className={`${styles.socialsContainer} ${css}`}>{content}</div>;
};
