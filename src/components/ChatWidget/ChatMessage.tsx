import React from 'react';
import { Box, Paper, Typography, Avatar, alpha, Fade, Slide } from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: Message;
  index?: number;
}

export default function ChatMessage({ message, index = 0 }: ChatMessageProps) {
  const theme = useTheme();
  const isUser = message.role === 'user';

  return (
    <Fade in={true} timeout={300} style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}>
      <Slide direction={isUser ? 'left' : 'right'} in={true} timeout={300}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            mb: 2,
            gap: 1,
            px: { xs: 1 },
          }}
        >
          {!isUser && (
            <Avatar
              sx={{
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha('#4ade80', 0.2)
                  : alpha('#10b981', 0.2),
                color: '#10b981',
                width: 36,
                height: 36,
                boxShadow: `0 2px 8px ${alpha('#10b981', 0.3)}`,
              }}
            >
              <SmartToy fontSize="small" />
            </Avatar>
          )}

          <Paper
            elevation={0}
            sx={{
              maxWidth: { xs: '85%' },
              p: 2,
              borderRadius: 2,
              background: isUser
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : theme.palette.mode === 'dark'
                ? alpha('#fff', 0.05)
                : '#fff',
              color: isUser ? 'white' : 'text.primary',
              boxShadow: isUser
                ? `0 4px 20px ${alpha('#667eea', 0.3)}`
                : `0 2px 12px ${alpha('#000', 0.08)}`,
              border: !isUser ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isUser
                  ? `0 6px 24px ${alpha('#667eea', 0.4)}`
                  : `0 4px 16px ${alpha('#000', 0.12)}`,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.6,
                fontSize: '0.95rem',
              }}
            >
              {message.content}
            </Typography>
            {message.timestamp && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  opacity: 0.7,
                  fontSize: '0.7rem',
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            )}
          </Paper>

          {isUser && (
            <Avatar
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: 36,
                height: 36,
                boxShadow: `0 2px 8px ${alpha('#667eea', 0.3)}`,
              }}
            >
              <Person fontSize="small" />
            </Avatar>
          )}
        </Box>
      </Slide>
    </Fade>
  );
}
