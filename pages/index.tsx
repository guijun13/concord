import type { NextPage } from 'next';
import { ReactChild } from 'react';

const Title = (props: { children: ReactChild; tag: any }) => {
  const Tag = props.tag;
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: red;
            font-size: 24px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
};

const Homepage: NextPage = () => {
  return (
    <>
      <Title tag="h1">Welcome back!</Title>
      <h2>Finally, Concord</h2>
    </>
  );
};

export default Homepage;
