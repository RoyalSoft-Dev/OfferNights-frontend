import { Stack, Box, Button, Container, Grid, Typography, TextField, Select, MenuItem, Checkbox } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { alignProperty } from '@mui/material/styles/cssUtils';

import {signUp} from '../../../../actions/authAction';
import { resendVerificationCode } from '../../../../actions/authAction';
import { checkToken } from '../../../../actions/authAction';

import isEmail from 'src/validation/is-email';
import isEmpty from 'src/validation/is-empty';
import { StateType } from 'src/reducer/dataType';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const navigate: any = useNavigate()

  const [token, setToken] = useState('');

  const signUpInfo: any = useSelector((state: StateType) => state.auth.signUpInfo);

  const onBackClick = e => {
    e.preventDefault();
    navigate('/user/sign-up')
  }

  const onVerifyCheck = e => {
    e.preventDefault();
    alert('Verify OK')
    checkToken(token)
  }

  const onChange = e => {
    setToken(e.target.value);
  }

  const onResendClick = e => {
    resendVerificationCode(signUpInfo.email)
  }
  

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Email Verify
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Please verify your email address
          </TypographyH2>

          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 1.5 }}
            variant="h4"
            textAlign={'center'}
            color="text.secondary"
            fontWeight="normal"
          >
            You should verify your email address and then you can visit our website.<br /> 
            You can confirm the verification code for your email in Email Server and then you can inform us via below verification code field.
          </TypographyH2><br />
          <Stack>
            <Link to={''} onClick={onResendClick}>
              <TypographyH2
                sx={{ lineHeight: 1.5, pb: 1.5 }}
                variant="h4"
                textAlign={'center'}
                color="text.secondary"
                fontWeight="normal"
              >
                Resend Verification Code to {signUpInfo.email}
              </TypographyH2><br />
            </Link>
            <TextField name="token" label="Verification Code" value={token} variant="outlined" onChange={onChange} /><br />
            <Button
              size="large"
              variant="contained"
              onClick={onVerifyCheck}
            >
              Verify
            </Button>
          </Stack><br /><br /><br />

          <SnackbarProvider />

          <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            size="large"
            variant="text"
            onClick={onBackClick}
          >
            Back
          </Button>
          
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
