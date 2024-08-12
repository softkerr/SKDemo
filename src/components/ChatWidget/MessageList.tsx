import React, { useRef, useEffect } from 'react';
import { Box, Alert, Typography, alpha } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import ChatMessage, { Message } from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error?: string | null;
}

export default function MessageList({ messages, isLoading, error }: MessageListProps) {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.divider, 0.1),
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '4px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}
    >
      {messages.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
            opacity: 0.6,
          }}
        >
          <ChatBubbleOutline sx={{ fontSize: 64, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            Start a conversation
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: 'center' }}>
            Ask me anything! I'm powered by Groq's lightning-fast AI.
          </Typography>
        </Box>
      )}

      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} index={index} />
      ))}

      {isLoading && <TypingIndicator />}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            boxShadow: `0 2px 8px ${alpha('#ef4444', 0.2)}`,
          }}
        >
          {error}
        </Alert>
      )}

      <div ref={messagesEndRef} />
    </Box>
  );
}
