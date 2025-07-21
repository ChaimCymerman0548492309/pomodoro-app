# pomodoro-app# Task Manager Application - README

## Overview
A full-stack task management application built with:
- **Frontend**: React + TypeScript with styled-components
- **Backend**: Node.js + Express with TypeScript
- **Data Storage**: JSON file-based persistence

## Features
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Set task priority (low, medium, high)
- Add due dates to tasks
- View task statistics and priority distribution
- Responsive design

## Project Structure
```
task-manager/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles.ts     # Styled components
│   │   └── App.tsx       # Main application
├── server/               # Backend Express server
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   └── data/         # Data storage
├── README.md             # This file
```

## Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ChaimCymerman0548492309/pomodoro-app
cd task-manager
```

### 2. Install dependencies
Run in both client and server directories:
```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

## Running the Application

### Start the backend server
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

### Start the frontend client
```bash
cd client
npm start
```
Client will run on `http://localhost:5000`

## API Endpoints

| Method | Endpoint       | Description                     |
|--------|---------------|---------------------------------|
| GET    | /tasks        | Get all tasks                   |
| POST   | /tasks        | Create a new task               |
| PUT    | /tasks/:id    | Update a task                   |
| DELETE | /tasks/:id    | Delete a task                   |
| GET    | /tasks/stats  | Get task statistics             |

## Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## Building for Production

### Build the frontend
```bash
cd client
npm run build
```

### Run production server
```bash
cd server
npm run build
npm start
```

## Deployment

### With Docker
1. Build the images:
```bash
docker-compose build
```

2. Run the containers:
```bash
docker-compose up
```



## Known Limitations
- No user authentication
- Data persistence is file-based (not suitable for large-scale production)
- Limited error handling in some edge cases

## Future Improvements
- Add user authentication
- Implement database storage (PostgreSQL/MongoDB)
- Add task categories/tags
- Implement drag-and-drop task ordering

## Technologies Used
- **Frontend**: React, TypeScript, styled-components, react-toastify
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Jest, supertest
- **Build Tools**: Webpack, Babel

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Desktop Application Build

To build the desktop version:

```bash
cd client
npm run build-electron

## License
[MIT](https://choosealicense.com/licenses/mit/)