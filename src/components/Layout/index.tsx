import Head from "next/head";
import { FC, ReactNode, useContext, useEffect } from "react";
import Header from "./header";
interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  //   const { isLoading } = useAppSelector((state) => state.loader);

  return (
    <>
      <Head>
        <title>Mons Finance</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        {/* <link rel="icon" href="/images/favicon.ico" sizes="any" />

        <link rel="preload" href="/mons/background-svg.svg" as="image" />
        <link rel="preload" href="/mons/logo-dark.svg" as="image" />
        <link rel="preload" href="/mons/logo-light.svg" as="image" />
        <link rel="preload" href="/mons/loader.svg" as="image" />
        <link rel="preload" href="/mons/bodyBgDark.svg" as="image" />
        <link rel="preload" href="/mons/bodyBgLight.svg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> */}

        {/* <link rel="stylesheet" href="/fonts/loader.css" /> */}
      </Head>
      <main>
        <>{children}</>

        {/* {isLoading && <AppLoader />} */}
      </main>
    </>
  );
};

export default Layout;
