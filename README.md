# Koala Restaurant Management System

Koala Restaurant is a comprehensive system designed to streamline restaurant operations. It includes modules for managing employees, orders, receipts, dishes, menus, and more.

## Prerequisites

Before you start, ensure you have the following:

1. An S3 bucket set up in the cloud.
2. A pair of IAM keys for accessing the S3 bucket.
3. A MySQL database.

## Setup

1. **Database Setup:**

   - Run `database.sql` on your MySQL database to set up the necessary tables and initial data.

2. **Environment Configuration:**

   - Create an `.env` file in the root of the project with the following variables:

     ```plaintext
     DB_ENDPOINT=your-db-endpoint.com
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_NAME=your-schema

     JWT_TOKEN=your-token

     ACCESS_KEY_AWS=your-key
     SECRET_KEY_AWS=your-secret
     DEFAULT_REGION_AWS=your-region
     S3_BUCKET_NAME=your-bucket
     CONNECTION_LIMIT=10
     ```

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Running the Project

To start the project, run:

```bash
npm run dev
```
