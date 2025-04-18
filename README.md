# NGO Impact Frontend

A modern web application for tracking and visualizing NGO activities and impact metrics.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://ngo-impact-frontend.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-View%20Code-green)](https://github.com/Shubhankar-12/ngo-impact-frontend)

## Overview

**NGO Impact** is a comprehensive platform designed to help organizations monitor and report their social impact. The application enables users to:

- Register new NGOs with detailed information
- Submit and track monthly activity reports
- Visualize impact data through intuitive dashboards
- Access aggregated statistics across multiple organizations

The frontend interfaces with a robust backend API to deliver a seamless experience for NGO management and impact assessment.

## Technology Stack

| Technology       | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| **Next.js**      | React framework with server-side rendering and routing |
| **TypeScript**   | Static typing for enhanced code reliability            |
| **Tailwind CSS** | Utility-first styling framework for responsive design  |
| **ShadCN UI**    | Accessible, customizable component library             |
| **Axios**        | Promise-based HTTP client for API communication        |

## Key Features

### Dashboard

- Interactive data visualizations of impact metrics
- Summary statistics of people helped, events conducted, and funds utilized
- Temporal analysis of NGO activities

### NGO Management

- Comprehensive NGO registration form with validation
- NGO directory with search and filtering capabilities
- Detailed NGO profiles with historical performance

### Reporting System

- Intuitive monthly report submission interface
- Validation to ensure data integrity
- Historical report viewing and comparison

## Pages

### Home Dashboard (`/`)

The central hub for visualizing aggregate impact data across all NGOs in the system. Features interactive charts and summary statistics for quick insights.

### NGO Management (`/ngo`)

A dedicated space for NGO operations including:

- Creating new NGO profiles with detailed information
- Browsing existing NGOs with search functionality
- Accessing detailed NGO information and historical reports

## API Integration

The frontend communicates with the backend API hosted at `https://ngo-impact-backend.onrender.com/api`.

### Key Endpoints

#### NGO Operations

- `GET /ngo/list?skip=0&limit=10&search=`: Retrieve paginated list of NGOs
- `POST /ngo/create`: Register a new NGO with detailed information

#### Reporting

- `POST /report/`: Submit monthly activity and impact reports
- `GET /report/dashboard?month=YYYY-MM`: Retrieve aggregated dashboard statistics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shubhankar-12/ngo-impact-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ngo-impact-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Create a `.env.local` file with the following configuration:

   ```
   NEXT_PUBLIC_API_BASE_URL=https://ngo-impact-backend.onrender.com/api
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. Access the application at `http://localhost:3000`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
