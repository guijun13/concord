import type { NextPage } from 'next';
import { ReactChild, useState } from 'react';
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';

const Title = (props: { children: ReactChild; tag: any }) => {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

const Homepage: NextPage = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['500'],
          // backgroundImage:
          //   'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['700'],
          }}
        >
          {/* Formulário */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              router.push(`/chat?username=${username}`);
            }}
          >
            <Box
              as="div"
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              <Title tag="h2">Welcome back!</Title>
              <Text
                variant="body3"
                styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['300'] }}
              >
                {appConfig.name}
              </Text>

              <TextField
                name="text field"
                fullWidth
                styleSheet={{
                  fontSize: '14px',
                }}
                textFieldColors={{
                  positive: {},
                  negative: {},
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals['200'],
                    mainColor: appConfig.theme.colors.neutrals['900'],
                    mainColorHighlight: appConfig.theme.colors.primary['500'],
                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                  },
                }}
                placeholder="Github username"
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
              />
              <Button
                type="submit"
                label="Entrar"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.primary['500'],
                  mainColorLight: appConfig.theme.colors.primary['400'],
                  mainColorStrong: appConfig.theme.colors.primary['600'],
                }}
              />
            </Box>
          </form>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals['800'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['999'],
              borderRadius: '10px',
              flex: 1,
              // minHeight: '240px',
            }}
          >
            <Image
              alt="User profile image"
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={
                username ? `https://github.com/${username}.png` : `http://via.placeholder.com/1000`
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              {username || 'Github username'}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
