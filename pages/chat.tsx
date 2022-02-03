import { NextPage } from 'next';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const Chat: NextPage = () => {
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const supabaseData = supabaseClient
      .from('messages')
      .select('*')
      .then(({ data }) => {
        setMessagesList(data);
      });
  }, []);

  function handleNewMessage(newMessage: string) {
    const message = {
      id: messagesList.length,
      from: 'guijun13',
      text: newMessage,
    };
    setMessagesList([message, ...messagesList]);
    setMessage('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary['500'],
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          height: '100%',
          maxWidth: '95%',
          // maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals['600'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList messagesList={messagesList} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              name="textField"
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals['800'],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals['200'],
              }}
              value={message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button variant="tertiary" colorVariant="neutral" label="Logout" href="/" />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props.messagesList.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'inline',
              }}
            >
              <Image
                alt="profile-pic"
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}

export default Chat;
