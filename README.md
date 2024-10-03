# Scheduler with Google Calendar for UNIST CSE courses.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Future improvement]
- [License](#license)

## Features

- Frontend built with React and TypeScript
- Backend API developed using Node.js, Express, and PostgreSQL
- User authentication and authorization
- Searching for a course and adding it to your Google Calendar
- Seeing all of the ratings plus reviews for a course, and average rating for a course as well
- Posting your own review and rating for a course anonymously
- Filter of courses based on your grade: sophomore, junior, and senior  

## Technologies Used

### Frontend

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
- [Axios](https://axios-http.com/) - For making HTTP requests

### Backend

- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 engine
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source object-relational database system
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- Yarn or npm

### Clone the Repository

```bash
git clone https://github.com/dariganarmanova/Scheduler-w-Google-Calendar-API.git
cd Scheduler-w-Google-Calendar-API
```

### Set up the backend

```bash
cd backend
npm install
npm start
```

### Set up the frontend

```bash
cd frontend
npm install
npm start
```

### Create a Google Cloud Project

- Go to the Google Cloud Console.
- Click on the project drop-down at the top of the page and select "New Project."
- Enter a project name and click "Create."

### Enable the Google Calendar API

- With your project selected, navigate to the API Library.
- Search for "Google Calendar API" and select it.
- Click the "Enable" button.

### Create Credentials

- In the left sidebar, navigate to "APIs & Services" > "Credentials."
- Click on "Create Credentials" and select "OAuth client ID."
- If prompted, configure the consent screen by selecting "External" and filling in the required fields.
- Choose "Web application" as the application type.
- In the "Authorized redirect URIs" section, add the URI where your application will handle OAuth 2.0 responses (e.g., http://localhost:5000/auth/google/callback).
  Click "Create."
  Note the Client ID and Client Secret generated.

### Install Google APIs Client Library

In your backend project, install the Google APIs client library by running:

```bash
npm install googleapis
```

### Set Up Authentication

- Go to a file called googleApi.ts in the backend directory to handle authentication:
- Replace CALENDAR_ID and CREDENTIALS with your own data you created.


## Future Improvement 

- Support database for each semester
- Add other semester's schedule and probability of the schedule for the next semester, as well as course openings
- Add the schedule for the exam 
