import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface UrlsState {
  urls: Array<string | undefined>
}

const initialState: UrlsState = {
  urls: [],
}

export const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    setAllUrls: (state, action: PayloadAction<Array<string | undefined>>) => {
      state.urls = action.payload
    },
  },
})

export const { setAllUrls } = urlsSlice.actions

export default urlsSlice.reducer
