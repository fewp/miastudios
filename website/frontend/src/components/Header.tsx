import NextLink from "next/link";
import React from "react";
import styles from "../../public/css/components/Header.module.css";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import Icon from "./Icon";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  // dados carregando
  if (fetching) {
    body = null;

    // usuário não está logado
  } else if (!data?.me) {
    body = (
      <div className={styles.signUpContainer}>
        <NextLink href="/user/register">
          <a>Sign up</a>
        </NextLink>
        <NextLink href="/user/login">
          <a>Log in</a>
        </NextLink>
      </div>
    );
    // usuário logado
  } else {
    body = (
      <div className={styles.loggedUserContainer}>
        <NextLink href="/user/profile">
          <a>
            {" "}
            <Icon name="user" />{" "}
          </a>
        </NextLink>
        <NextLink href="/cart">
          <a>
            {" "}
            <Icon name="cart" />{" "}
          </a>
        </NextLink>
        <button
          className={styles.logoutButton}
          onClick={() => {
            logout();
          }}
        >
          <Icon name="logout" />
        </button>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NextLink href="/">
            <img
              src="/assets/img/logo.png"
              width={70}
              height={70}
              className={styles.headerLogo}
            />
          </NextLink>
          <div className={styles.headerTextContainer}>
            <NextLink href="/">Home</NextLink>
            <NextLink href="/portfolio">Portfolio</NextLink>
            <NextLink href="/about">About Us</NextLink>
            <NextLink href="/shop">Shop</NextLink>
            <NextLink href="/contact">Contact</NextLink>
          </div>
        </div>
        <div className={styles.headerIcons}>{body}</div>
      </header>
    </>
  );
};
