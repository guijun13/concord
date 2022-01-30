import type { NextPage } from 'next';
import { ReactChild } from 'react';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

const Title = (props: { children: ReactChild; tag: any }) => {
  const Tag = props.tag;
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['900']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

const Homepage: NextPage = () => {
  return (
    <>
      <GlobalStyle />
      <Title tag="h1">Welcome back!</Title>
      <h2>Finally, Concord</h2>
    </>
  );
};

export default Homepage;
