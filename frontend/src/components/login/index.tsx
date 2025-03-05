'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from 'js-cookie';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const KEYCLOAK_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;
const SECRET = process.env.NEXT_PUBLIC_SECRET;

// Define a custom styled container using Emotion
const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '2',
  backgroundColor: theme.palette.background.paper,
}));

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleIdPLogin = (provider: string) => {
    const loginUrl =
      `${KEYCLOAK_BASE_URL}/protocol/openid-connect/auth` +
      `?client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI ?? '')}` +
      `&kc_idp_hint=${provider}` +
      `&scope=openid`;
    window.location.href = loginUrl;
  };

  const handleDirectLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${KEYCLOAK_BASE_URL}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: CLIENT_ID ?? '',
            // client_secret: SECRET ?? "",
            grant_type: 'password',
            username,
            password,
            scope: 'openid',
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const tokens = await response.json();
      // console.log("Tokens:", JSON.stringify(tokens));
      Cookies.set('access_token', tokens.access_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      Cookies.remove('id_token');
      Cookies.set('id_token', tokens.id_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      Cookies.remove('refresh_token');
      Cookies.set('refresh_token', tokens.refresh_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      console.log(Cookies.get('refresh_token'), tokens?.refresh_token);
      window.location.href = '/list';
    } catch (error: any) {
      setError(error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CenteredBox>
        <FormContainer>
          <Typography variant="h5" mb={2} align="center" gutterBottom>
            Login
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => handleIdPLogin('google')}
            sx={{ mb: 2 }}
            startIcon={<GoogleIcon />}
          >
            Login with Google
          </Button>
          <Typography variant="body2" align="center" gutterBottom>
            Or login with your username and password
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDirectLogin}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </FormContainer>
      </CenteredBox>
    </>
  );
};

export default Login;
