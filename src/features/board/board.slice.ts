import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProject } from './board.api'
import type { Project } from '../../entities/project'

export const fetchBoard = createAsyncThunk(
  'board/fetch',
  async (projectId: string) => {
    return await getProject(projectId)
  }
)

type BoardState = {
  project: Project | null
  loading: boolean
}

const initialState: BoardState = {
  project: null,
  loading: false,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.loading = false
        state.project = action.payload
      })
      .addCase(fetchBoard.rejected, (state) => {
        state.loading = false
      })
  },
})

export default boardSlice.reducer