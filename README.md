# My Mini Ticketing System

This is a simple Angular application with functionalities for viewing, and updating tickets. The app includes a fixed navigation bar, breadcrumbs for navigation, and forms for updating tickets.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Angular CLI](https://angular.io/cli) (v11 or higher)

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```
npm install
```

### 3. Set Up Fake REST API
1. Install `json-server` globally:
```bash
npm install -g json-server
```
2. Start the fake REST API server:
```bash
json-server --watch db.json --port 3000
```

### 4. Start the Application
```bash
ng serve
```
Open your browser and navigate to http://localhost:4200.
