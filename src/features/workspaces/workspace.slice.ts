import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addMember, createWorkspace, getWorkspace, getWorkspaces } from './workspace.api'
import type { Workspace } from '../../entities/workspace'

export const fetchWorkspaces = createAsyncThunk('workspaces/fetch', async () => {
  return await getWorkspaces()
})

export const fetchWorkspaceDetails = createAsyncThunk('workspace/fetch', async (workspaceId: string) => {
  return await getWorkspace(workspaceId)
})

export const addWorkspace = createAsyncThunk('workspaces/add', async (name: string) => {
  return await createWorkspace({ name })
})

export const addMemberAsync = createAsyncThunk(
  'workspaces/addMember',
  async (
    params: {
      workspaceId: string
      email: string
      role: 1 | 2 | 3
    },
    { rejectWithValue }
  ) => {
    try {
      return await addMember(params.workspaceId, {
        email: params.email,
        role: params.role,
      })
    } catch (e: any) {
      return rejectWithValue(e.response?.data || 'Error')
    }
  }
)

type WorkspacesState = {
  items: Workspace[]
  loading: boolean
  error: string | null
}

const initialState: WorkspacesState = {
  items: [],
  loading: false,
  error: null,
}

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchWorkspaces.fulfilled, (state, action: PayloadAction<Workspace[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch workspaces'
      })

      .addCase(addWorkspace.pending, (state) => { state.loading = true; state.error = null })
      .addCase(addWorkspace.fulfilled, (state, action: PayloadAction<Workspace>) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add workspace'
      })
  },
})

export default workspacesSlice.reducer