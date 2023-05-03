import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Dispatch } from './app';
import { checkLoginStatus } from './user';
import { getAccessToken } from './voice/accessToken';
import { register } from './voice/registration';

type BootstrapAppRejectValue =
  | {
      reason: 'CHECK_LOGIN_STATUS_REJECTED';
    }
  | {
      reason: 'GET_ACCESS_TOKEN_REJECTED';
    }
  | {
      reason: 'REGISTER_REJECTED';
    };

type BootstrapAppFulfillValue = 'NOT_LOGGED_IN' | 'LOGGED_IN';

export const bootstrapApp = createAsyncThunk<
  BootstrapAppFulfillValue,
  void,
  {
    dispatch: Dispatch;
    rejectValue: BootstrapAppRejectValue;
  }
>('app/bootstrap', async (_, { dispatch, rejectWithValue }) => {
  const checkLoginStatusResult = await dispatch(checkLoginStatus());
  if (checkLoginStatus.rejected.match(checkLoginStatusResult)) {
    return rejectWithValue({ reason: 'CHECK_LOGIN_STATUS_REJECTED' });
  }

  const { accessToken, email } = checkLoginStatusResult.payload;
  if (accessToken === '' || email === '') {
    return 'NOT_LOGGED_IN';
  }

  const getAccessTokenResult = await dispatch(getAccessToken());
  if (getAccessToken.rejected.match(getAccessTokenResult)) {
    return rejectWithValue({ reason: 'GET_ACCESS_TOKEN_REJECTED' });
  }

  const registerResult = await dispatch(register());
  if (register.rejected.match(registerResult)) {
    return rejectWithValue({ reason: 'REGISTER_REJECTED' });
  }

  return 'LOGGED_IN';
});