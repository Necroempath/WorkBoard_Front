export type Workspace = {
  id: string
  name: string
}

export type WorkspaceDetails = {
  id: string
  name: string
  members: { id: string; name: string; email: string; role: string; } []
}