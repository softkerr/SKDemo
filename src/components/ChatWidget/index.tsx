'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Fab,
  Zoom,
  Collapse,
  alpha,
  Badge,
  Tooltip,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ChatBubbleOutline,
  Close,
  Minimize,
  Add,
  DeleteOutline,
  Refresh,
  Search,
  Edit,
  Check,
  Cancel,
  Chat,
  History,
} from '@mui/icons-material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from './ChatMessage';

const STORAGE_KEY = 'chat-conversations';

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: number;
  messageCount: number;
}

interface StoredConversation extends Conversation {
  messages: Message[];
}

/**
 * VARIANT 2: TABBED VIEW
 * Switch between Chat and Conversations tabs
 * Single pane with tab navigation at top
 */
export default function ChatWidget() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // 0: Chat, 1: Conversations
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0) {
          setActiveConversationId(parsed[0].id);
          setMessages(parsed[0].messages);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Update active conversation messages
  useEffect(() => {
    if (activeConversationId) {
      const conv = conversations.find((c) => c.id === activeConversationId);
      if (conv) {
        setMessages(conv.messages);
      }
    }
  }, [activeConversationId, conversations]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    updateConversationMessages(updatedMessages);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      updateConversationMessages(finalMessages);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversationMessages = (newMessages: Message[]) => {
    if (!activeConversationId) {
      const newConv: StoredConversation = {
        id: Date.now().toString(),
        title: newMessages[0]?.content.slice(0, 50) || 'New Chat',
        preview: newMessages[0]?.content.slice(0, 80) || '',
        timestamp: Date.now(),
        messageCount: newMessages.length,
        messages: newMessages,
      };
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    } else {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                preview: newMessages[newMessages.length - 1]?.content.slice(0, 80) || '',
                timestamp: Date.now(),
                messageCount: newMessages.length,
                messages: newMessages,
              }
            : conv
        )
      );
    }
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
    setError(null);
    setCurrentTab(0); // Switch to chat tab
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setError(null);
    setCurrentTab(0); // Switch to chat tab
  };

  const handleDeleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);

    if (activeConversationId === id) {
      if (filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
        setMessages(filtered[0].messages);
      } else {
        handleNewConversation();
      }
    }
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
    );
    setEditingId(null);
  };

  const handleStartEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  return (
    <>
      {/* Chat Widget - Tabbed View */}
      <Zoom in={isOpen}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: { xs: 'calc(100vw - 48px)', sm: 400, md: 450 },
            height: { xs: 'calc(100vh - 100px)', sm: 600 },
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            background:
              theme.palette.mode === 'dark' ? alpha('#1a1a2e', 0.95) : alpha('#fff', 0.98),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha('#000', 0.3)}`,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'default',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                AI Assistant
              </Typography>
              {activeConversation && (
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  • {activeConversation.messageCount} msgs
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Close">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  sx={{ color: 'white' }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Tabs Navigation */}

            <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 60px)' }}>
              <Tabs
                value={currentTab}
                onChange={(_, newValue) => setCurrentTab(newValue)}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  background: alpha(theme.palette.background.default, 0.3),
                  '& .MuiTab-root': {
                    minHeight: 48,
                  },
                }}
              >
                <Tab
                  icon={<Chat fontSize="small" />}
                  label="Chat"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                />
                <Tab
                  icon={
                    <Badge badgeContent={conversations.length} color="primary">
                      <History fontSize="small" />
                    </Badge>
                  }
                  label="History"
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                />
              </Tabs>

              {/* Tab Panel 0: Chat View */}
              {currentTab === 0 && (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <MessageList messages={messages} isLoading={isLoading} error={error} />

                  <Box
                    sx={{
                      p: 2,
                      borderTop: 1,
                      borderColor: 'divider',
                      background: alpha(theme.palette.background.paper, 0.5),
                    }}
                  >
                    <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
                  </Box>
                </Box>
              )}

              {/* Tab Panel 1: Conversations View */}
              {currentTab === 1 && (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* New Conversation Button */}
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleNewConversation}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)',
                        },
                      }}
                    >
                      New Conversation
                    </Button>
                  </Box>

                  {/* Search */}
                  <Box sx={{ px: 2, pb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Conversations List */}
                  <List
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      px: 1,
                      '&::-webkit-scrollbar': { width: '6px' },
                      '&::-webkit-scrollbar-thumb': {
                        background: alpha(theme.palette.primary.main, 0.3),
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {filteredConversations.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                        <History sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                        <Typography variant="body2">No conversations yet</Typography>
                        <Typography variant="caption">Start chatting to create history</Typography>
                      </Box>
                    ) : (
                      filteredConversations.map((conv) => (
                        <ListItemButton
                          key={conv.id}
                          selected={activeConversationId === conv.id}
                          onClick={() => handleSelectConversation(conv.id)}
                          sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: 1,
                            borderColor:
                              activeConversationId === conv.id
                                ? 'primary.main'
                                : alpha(theme.palette.divider, 0.3),
                            '&.Mui-selected': {
                              background: alpha(theme.palette.primary.main, 0.1),
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              editingId === conv.id ? (
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                  <TextField
                                    size="small"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{ flex: 1 }}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRenameConversation(conv.id, editTitle);
                                    }}
                                  >
                                    <Check fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelEdit();
                                    }}
                                  >
                                    <Cancel fontSize="small" />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography variant="body2" noWrap sx={{ fontWeight: 600, flex: 1 }}>
                                    {conv.title}
                                  </Typography>
                                  <Box>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartEdit(conv.id, conv.title);
                                      }}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteConversation(conv.id);
                                      }}
                                    >
                                      <DeleteOutline fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Box>
                              )
                            }
                            secondary={
                              <>
                                <Typography variant="caption" noWrap display="block">
                                  {conv.preview}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatTimestamp(conv.timestamp)} • {conv.messageCount} messages
                                </Typography>
                              </>
                            }
                          />
                        </ListItemButton>
                      ))
                    )}
                  </List>
                </Box>
              )}
            </Box>
        </Paper>
      </Zoom>

      {/* Floating Action Button */}
      <Zoom in={!isOpen}>
        <Fab
          color="primary"
          onClick={() => {
            setIsOpen(true);
            setUnreadCount(0);
          }}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: 64,
            height: 64,
            boxShadow: `0 4px 20px ${alpha('#667eea', 0.4)}`,
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
            zIndex: 1300,
          }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <ChatBubbleOutline sx={{ fontSize: 28 }} />
          </Badge>
        </Fab>
      </Zoom>
    </>
  );
}
