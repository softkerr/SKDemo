import React, { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton, Paper, alpha } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const theme = useTheme();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        borderRadius: 2,
        background: theme.palette.mode === 'dark'
          ? alpha('#fff', 0.05)
          : alpha('#000', 0.02),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:focus-within': {
          background: theme.palette.mode === 'dark'
            ? alpha('#fff', 0.08)
            : alpha('#000', 0.03),
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message"
        disabled={disabled}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '0.95rem',
          },
        }}
      />
      <IconButton
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        sx={{
          background: input.trim() && !disabled
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : alpha(theme.palette.action.disabled, 0.12),
          color: input.trim() && !disabled ? 'white' : theme.palette.action.disabled,
          width: 40,
          height: 40,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: input.trim() && !disabled
              ? 'linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)'
              : alpha(theme.palette.action.disabled, 0.12),
            transform: input.trim() && !disabled ? 'scale(1.05)' : 'none',
          },
          '&:active': {
            transform: input.trim() && !disabled ? 'scale(0.95)' : 'none',
          },
          '&.Mui-disabled': {
            background: alpha(theme.palette.action.disabled, 0.12),
            color: theme.palette.action.disabled,
          },
        }}
      >
        <Send fontSize="small" />
      </IconButton>
    </Paper>
  );
}
