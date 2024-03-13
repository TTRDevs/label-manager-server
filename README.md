# Label Manager Server

## Overview

This repository is part of a Label Manager solution, focusing on the back-end services. It works in conjunction with a front-end interface, stored in a separate repository, to provide a comprehensive solution for managing music label operations. A fully functional version of this solution will be deployed and accessible online; details and the link are provided below.

- **Front-End Repository:** [Label Manager (Front-End)](https://github.com/TTRDevs/label-manager)
- **Online Version:** ~~[Visit the Deployed Application]~~ TBD

## Main Functionality

The primary objective of this back-end service is to fetch sales reports from BandCamp, enabling users to visualize their sales data through an online dashboard. This process involves:

- Requesting sales reports from the BandCamp API.
- Storing the retrieved data in a PostgreSQL database.
- Displaying the data through dashboards using Metabase.

This solution is designed to run within Docker containers, ensuring a consistent and isolated environment for deployment.

## Getting Started with Docker

To run this project using Docker, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/TTRDevs/label-manager-server.git
```

2. **Prepare the environment file:**

- Edit the `.env.example` file with the necessary environment variables, and save as `.env` before running the docker command.

3. **Run the application using Docker Compose:**

```bash
docker compose -f "docker-compose.yml" up -d --build 
```

This will start all the necessary services defined in your `docker-compose.yml` file, including the PostgreSQL database and the Metabase dashboard, alongside the back-end application.
