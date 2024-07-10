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

## Dependencies

This project uses the following dependencies:

[![npm](https://img.shields.io/npm/v/@babel/runtime?label=%40babel/runtime)](https://www.npmjs.com/package/@babel/runtime)
[![npm](https://img.shields.io/npm/v/aws-sdk?label=aws-sdk)](https://www.npmjs.com/package/aws-sdk)
[![npm](https://img.shields.io/npm/v/bcrypt?label=bcrypt)](https://www.npmjs.com/package/bcrypt)
[![npm](https://img.shields.io/npm/v/cors?label=cors)](https://www.npmjs.com/package/cors)
[![npm](https://img.shields.io/npm/v/dotenv?label=dotenv)](https://www.npmjs.com/package/dotenv)
[![npm](https://img.shields.io/npm/v/express?label=express)](https://www.npmjs.com/package/express)
[![npm](https://img.shields.io/npm/v/helmet?label=helmet)](https://www.npmjs.com/package/helmet)
[![npm](https://img.shields.io/npm/v/jsonwebtoken?label=jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
[![npm](https://img.shields.io/npm/v/multer?label=multer)](https://www.npmjs.com/package/multer)
[![npm](https://img.shields.io/npm/v/mysql?label=mysql)](https://www.npmjs.com/package/mysql)
[![npm](https://img.shields.io/npm/v/swagger-jsdoc?label=swagger-jsdoc)](https://www.npmjs.com/package/swagger-jsdoc)
[![npm](https://img.shields.io/npm/v/swagger-ui-express?label=swagger-ui-express)](https://www.npmjs.com/package/swagger-ui-express)
[![npm](https://img.shields.io/npm/v/uuid?label=uuid)](https://www.npmjs.com/package/uuid)

### Development Dependencies

[![npm](https://img.shields.io/npm/v/@babel/cli?label=%40babel/cli)](https://www.npmjs.com/package/@babel/cli)
[![npm](https://img.shields.io/npm/v/@babel/core?label=%40babel/core)](https://www.npmjs.com/package/@babel/core)
[![npm](https://img.shields.io/npm/v/@babel/node?label=%40babel/node)](https://www.npmjs.com/package/@babel/node)
[![npm](https://img.shields.io/npm/v/@babel/plugin-transform-runtime?label=%40babel/plugin-transform-runtime)](https://www.npmjs.com/package/@babel/plugin-transform-runtime)
[![npm](https://img.shields.io/npm/v/@babel/preset-env?label=%40babel/preset-env)](https://www.npmjs.com/package/@babel/preset-env)
[![npm](https://img.shields.io/npm/v/nodemon?label=nodemon)](https://www.npmjs.com/package/nodemon)

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. To view a copy of this license, visit [Creative Commons](https://creativecommons.org/licenses/by-nc/4.0/).

### Summary of the License

- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial**: You may not use the material for commercial purposes.

For more details, see the [full license](https://creativecommons.org/licenses/by-nc/4.0/).

---

The EHC Team
