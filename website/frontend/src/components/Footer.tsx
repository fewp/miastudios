import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import styles from "../../public/css/components/Footer.module.css";
import { Socials } from "./Socials";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.columnContainerOne}>
        <div className={styles.footerLogoContainer}>
          <NextLink href="/">
            <NextImage
              src="/assets/img/logo.png"
              width={70}
              height={70}
              layout="fixed"
              objectFit="contain"
              objectPosition="left left"
              alt="Logo"
            />
          </NextLink>
          <div className={`${styles.logoTextContainer} `}>
            <span>MIASTUDIOS</span>
            <desc>Minecraft Build Team</desc>
          </div>
        </div>
        <div className={styles.footerDescriptionContainer}>
          <p>
            Mia Studios Lorem ea pariatur magna aliqua eu labore culpa in irure
            tempor excepteur proident.
          </p>
        </div>
        <Socials css={styles.socialsContainer} />
      </div>
      <div
        className={`${styles.columnContainerOne} ${styles.usefulLinksContainer}`}
      >
        <div className={`${styles.columnTitleContainer} `}>
          <span>USEFUL LINKS</span>
        </div>
        <div className={`${styles.footerLinksRow}`}>
          <div className={`${styles.footerLinks} `}>
            <NextLink href="/portfolio">Portfolio</NextLink>
            <NextLink href="/about">About Us</NextLink>
            <NextLink href="/shop">Shop</NextLink>
            <NextLink href="#contact">Contact</NextLink>
          </div>
          <div className={`${styles.footerLinks} `}>
            <NextLink href="/commissions">Commissions</NextLink>
            <NextLink href="/education">Education</NextLink>
            <NextLink href="/marketplace">Marketplace</NextLink>
            <a href="https://discord.gg/jWR9Nem">Support</a>
          </div>
        </div>
      </div>
      <div className={`${styles.columnContainerTwo}`}>
        <div className={`${styles.columnTitleContainer} `}>
          <span>RECENT POSTS</span>
        </div>
        {/* get last 3 posts from portfolio using graphql */}
        <div className={`${styles.postsContainer} `}>
          <NextImage
            src="/assets/img/uploads/builds/10.png"
            width={172.8}
            height={97.2}
            layout="fixed"
            objectFit="contain"
            objectPosition="left left"
          />
          <NextImage
            src="/assets/img/uploads/builds/11.png"
            width={172.8}
            height={97.2}
            layout="fixed"
            objectFit="contain"
          />
          <NextImage
            src="/assets/img/uploads/builds/9.png"
            width={172.8}
            height={97.2}
            layout="fixed"
            objectFit="contain"
          />
        </div>
      </div>
    </footer>
  );
};
