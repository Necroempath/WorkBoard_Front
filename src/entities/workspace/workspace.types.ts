export type Workspace = {
  id: string
  name: string
  role: string
}

export type WorkspaceDetails = {
  id: string
  name: string
  members: { id: string; name: string; email: string; role: string; } []
}

export type WorkspaceMember = {
  userId: string
  name: string
  email: string
  role: number
}

// export const enum RoleEnum {
//   Owner = 0,
//   Admin = 1,
//   Member = 2,
//   Viewer = 3
// } 