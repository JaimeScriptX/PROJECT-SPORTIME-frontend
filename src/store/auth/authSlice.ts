import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  status: string
  user: {
    uuid:string,
    name: string,
    username: string,
    email: string,
    image_profile: string
  },
  tokenExpiration?: number
  errorMessage: undefined
}

const initialState: authState = {
  status: 'checking',
  user: {
    uuid:"",
    name: "",
    username: "",
    email: "",
    image_profile: ""
  },
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
        state.status = 'checking',
        state.user = initialState.user
        state.errorMessage = undefined
    },
    onLogin: (state, {payload},) => {
        state.status = 'authenticated'
        state.user = {uuid:payload.uuid, name:payload.name, username:payload.username, email:payload.email, image_profile:payload.image_profile}
        state.tokenExpiration = payload.tokenExpiration
        state.errorMessage = undefined
    },
    onLogout: (state, {payload}) => {
        state.status = 'not-authenticated'
        state.user = initialState.user
        state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions