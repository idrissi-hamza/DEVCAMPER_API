# DevCamper API
>Backend API 

>Welcome to the DevCamper API documentation. This API provides endpoints to manage bootcamps, courses, user authentication, and reviews. DevCamper is a platform that allows users to discover coding bootcamps, enroll in courses, and leave reviews.



## Usage

Before using this API, make sure to:

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own.
Overview

## Install Dependencies
```
npm install
```

##Run App
```
// Run in dev mode
npm run dev 

//Run in production mode
npm start
```




## Authentication
To access protected endpoints, users need to authenticate using JWT (JSON Web Tokens). After successful registration or login, an access token will be provided, which should be included in the Authorization header of subsequent API requests.

## API Usage/Requests
1. Register a new user account using the `/api/auth/register` endpoint.
2. Log in to obtain an access token using the `/api/auth/login` endpoint.
3. Use the provided access token in the `Authorization` header of subsequent API requests to access protected endpoints.
4. Explore and interact with the available endpoints to manage bootcamps, courses, and reviews.

##
##  
## Documentation

For detailed API documentation and usage instructions, please refer to the [API Documentation](./documentation.md) markdown file.


> Version :1.0.0

> Licence MIT

