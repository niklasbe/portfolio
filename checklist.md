## Frontend

- [ ] Update wireframe and styling
- [ ] Streamline components
- [ ] Create custom hook for projects (e.g., `useProjects`)
- [ ] Create configuration file for URLs
- [ ] Abstract libraries into service/util files
- [ ] Implement Zod validation for project data
- [#] Extend project data with new fields (`publishedAt`, `public`, `status`, tags)
- [ ] Use `date-fns` for date formatting in frontend
- [ ] Create dedicated `ProjectPage` component
- [ ] Create reusable `Layout.tsx` component
- [ ] Display project relations (collaborators, media, customer) on project page
- [ ] Implement cookie-based authentication

## Backend

- [ ] Support new project data fields in database
- [ ] Set up SQLite database for project data storage
- [ ] Implement Zod validation for server-side data
- [ ] Ensure consistent API responses
- [ ] Implement CRUD functionality for projects:
  - [ ] Create new projects
  - [ ] Read all projects
  - [ ] Read one specific project
  - [ ] Update existing projects
  - [ ] Delete projects
- [ ] Create and manage relations between projects and other data

## Testing

- [ ] Write tests for commonly used functions (e.g., validation functions)
- [ ] Test at least one frontend component or frontend-backend integration