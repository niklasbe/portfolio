# Portfolio

### Simple portfolio website for ITF31619-1

## How to run

### Backend

The `backend` directory contains a server that is set up to accept requests from certain endpoints. The server is required for the frontend to properly fetch data.

To set up a local development server, run the following commands:
```
cd backend
npm install
npm run dev
```

The server is by default hosted on port `3000`. 

### Frontend

The `frontend` directory contains a React project that is responsible for the user interface. Requests are made to the backend, and the data fetched interacts with the client-sided JavaScript code to alter the appearance and functionality of the user interface. 

Start the dev server:

```
cd frontend
npm install
npm run dev
```
Connect to the dev server by visiting:
```
http://localhost:5173
```