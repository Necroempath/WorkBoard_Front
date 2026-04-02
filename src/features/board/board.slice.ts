import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createColumn, createIssue, getProject, moveIssueApi, type CreateColumnParams } from './board.api'
import type { Project } from '../../entities/project'
import { api } from '../../shared/api/api'
import type { Issue } from '../../entities/issue'


export const createColumnAsync = createAsyncThunk(
  'board/createColumn',
  async (params : CreateColumnParams) => {
    return await createColumn(params)
  }
)

export const createIssueAsync = createAsyncThunk(
  'board/createIssue',
  async (params: any) => {
    return await createIssue(params)
  }
)

export const moveIssueAsync = createAsyncThunk(
  'board/moveIssue',
  async (params: {
    issueId: string
    targetColumnId: string
    targetIndex: number
  }) => {
    return await moveIssueApi(params)
  }
)

export const fetchBoard = createAsyncThunk(
  'board/fetch',
  async (projectId: string) => {
    const data = await getProject(projectId)

    data.columns.forEach(col => {
      col.issues.sort((a, b) => a.order - b.order)
    })

    return data
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
  reducers: {
  moveIssue: (state, action) => {
    const { issueId, fromColumnId, toColumnId } = action.payload

    if (!state.project) return
    console.log('2 move issue func in slice')

    const fromCol = state.project.columns.find(c => c.id === fromColumnId)
    const toCol = state.project.columns.find(c => c.id === toColumnId)

    if (!fromCol || !toCol) return

    const index = fromCol.issues.findIndex(i => i.id === issueId)
    if (index === -1) return

    const [issue] = fromCol.issues.splice(index, 1)
    toCol.issues.push(issue)
  },
  setProject: (state, action) => {
   state.project = action.payload
  }
  },
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
      .addCase(createColumnAsync.fulfilled, (state, action) => {
          state.project?.columns.push(action.payload)
      })
      .addCase(createIssueAsync.fulfilled, (state, action) => {
      const issue = action.payload

      const column = state.project?.columns.find(c => c.id === issue.columnId)
      column?.issues.push(issue)
    })
    .addCase(moveIssueAsync.pending, (state, action) => {
      const { issueId, targetColumnId, targetIndex } = action.meta.arg

      let issue: Issue | undefined
      if (!state.project) return

      for (const col of state.project.columns) {
        const idx = col.issues.findIndex(i => i.id === issueId)
        if (idx !== -1) {
          issue = col.issues.splice(idx, 1)[0]
          break
        }
      }

      if (!issue) return

      const targetCol = state.project.columns.find(c => c.id === targetColumnId)
      if (!targetCol) return

      targetCol.issues.splice(targetIndex, 0, issue)
    })
  },
})

export const { moveIssue, setProject } = boardSlice.actions
export default boardSlice.reducer