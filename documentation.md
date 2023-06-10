
# DevCamper Api

Backend Api for creating the devCamper application to manage bootcamps, courses, reviews and authentication

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [Bootcamps](#bootcamps)
    1. [Get All Bootcamps](#1-get-all-bootcamps)
    1. [Get Single Bootcamp](#2-get-single-bootcamp)
    1. [Create New Bootcamp](#3-create-new-bootcamp)
    1. [Update Bootcamp](#4-update-bootcamp)
    1. [Delete Bootcamp](#5-delete-bootcamp)
    1. [Get  Bootcamps by Distance](#6-get--bootcamps-by-distance)
    1. [Update Photo](#7-update-photo)
* [Courses](#courses)
    1. [Get All Courses](#1-get-all-courses)
    1. [Get Courses for bootcamp](#2-get-courses-for-bootcamp)
    1. [Get Single Course](#3-get-single-course)
    1. [Create New Course](#4-create-new-course)
    1. [Update Course](#5-update-course)
    1. [Delete a Single Course](#6-delete-a-single-course)
* [Authentication](#authentication)
    1. [Register User](#1-register-user)
    1. [Login User](#2-login-user)
    1. [Get Logged in User via Token](#3-get-logged-in-user-via-token)
    1. [Forget password](#4-forget-password)
    1. [Reset Password](#5-reset-password)
    1. [Update User Details](#6-update-user-details)
    1. [Update Password](#7-update-password)
* [Users](#users)
    1. [Get All Users](#1-get-all-users)
    1. [Get Single User](#2-get-single-user)
    1. [Create  User](#3-create--user)
    1. [Update  User](#4-update--user)
    1. [Delete  User](#5-delete--user)
* [Reviews](#reviews)
    1. [Get All Reviews](#1-get-all-reviews)
    1. [Get Single Review](#2-get-single-review)
    1. [Get  Reviews for Bootcamp](#3-get--reviews-for-bootcamp)
    1. [Add review for a Bootcamp](#4-add-review-for-a-bootcamp)
    1. [Delete  Single Review](#5-delete--single-review)
    1. [Update  review](#6-update--review)

--------



## Bootcamps

Bootcamps CRUD functionalities



### 1. Get All Bootcamps


Fetch all bootcamps from database includes pagination, filtering etc


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps
```



### 2. Get Single Bootcamp


Get single bootcamps by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787
```



### 3. Create New Bootcamp


Add new bootcamp to database. Must be authenticated and must be publisher or admin.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{"name": "Devcentral Bootcamp test",
		"description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
		"website": "https://devcentral.com",
		"phone": "(444) 444-4444",
		"email": "enroll@devcentral.com",
		"address": "45 Upper College Rd Kingston RI 02881",
		"careers": [
			"Mobile Development",
			"Web Development",
			"Data Science",
			"Business"
		],
		"housing": false,
		"jobAssistance": true,
		"jobGuarantee": true,
		"acceptGi": true
		}
```



### 4. Update Bootcamp


Update single bootcamp in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/647b5c916d822414c407d869
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{"housing":true}
```



### 5. Delete Bootcamp


Delete bootcamp  from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/bootcamps/6480d971309a9c540750126b
```



### 6. Get  Bootcamps by Distance


Get bootcamps within a radius of a specific zipcode


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/radius/02118/30
```



### 7. Update Photo


Route to upload bootcamp photo


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/photo
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



## Courses

Create, read, update and delete courses



### 1. Get All Courses


Get all courses in database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses
```



### 2. Get Courses for bootcamp


Get the specific courses for a bootcamp


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses
```



### 3. Get Single Course


Get single course by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses/5d725a4a7b292f5f8ceff789
```



### 4. Create New Course


Create a new Course for a bootcamp


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ "title": "Front End Web Development ",
        "description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
        "weeks": "8",
        "tuition": 10000,
        "minimumSkill": "beginner",
        "scholarshipAvailable": false }
            
```



### 5. Update Course


Update Course in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/courses/5d725a4a7b292f5f8ceff789
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{"tuition":3000,"minimumSkill":"advanced"}
```



### 6. Delete a Single Course


Delete a single course


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/courses/647e4626e692002a18caef7f
```



## Authentication

Routes for user authentication including register,login, reset password etc



### 1. Register User


register a user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ "name": "hamza idrissi ",
"email": "hamza@gmail.com",
"password": "123456",
"role": "publisher" }
            
```



### 2. Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ 
"email": "hamza@gmail.com",
"password": "123456" 
}
            
```



### 3. Get Logged in User via Token



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Forget password


Generate password token and send email


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ 
"email": "hamza@gmail.com"
}
            
```



### 5. Reset Password


reset user password using token


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/resetpassword/af39916cd53536cec11275271a6c5c102e2c4486
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ 
"password": "12345a"
}
            
```



### 6. Update User Details


Update logged in user name and email


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ 
"email": "hamza@gmail.com",
"name": "hamza smith" 
}
            
```



### 7. Update Password


Update logedin user password, send in the body currentPassword and newPassword


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{ 
"newPassword": "123456",
"currentPassword": "12345a" 
}
            
```



## Users

CRUD functionality for users only available to admins



### 1. Get All Users


Get all users (admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/
```



### 2. Get Single User


Get single user by id (admin)


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc031
```



### 3. Create  User


Add user to database (admin)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
  {  
            "name": "Sara ozil",
            "email": "ozil@gmail.com",
            "password": "123456"
           
        }
```



### 4. Update  User


Update user in database (admin)


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/6483529b0822feed6bdc897f
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
  {  
            "role": "user"
   
           
        }
```



### 5. Delete  User


Delete user from database (admin)


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/6483108260bffedf8d8cbfed
```



## Reviews

manage courses reviews



### 1. Get All Reviews


Get all reviews from data nd populate with bootcamp name and description


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews
```



### 2. Get Single Review


Fetch a review from data base by id and populate bootcamp name and description


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews/5d7a514b5d2c12c7449be026
```



### 3. Get  Reviews for Bootcamp


Get reviews for a bootcamp by bootcampId


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```



### 4. Add review for a Bootcamp


Add review for a specific bootcamp


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title":"nice bootcamap",
    "text":"I learned a lot",
    "rating":7

}
```



### 5. Delete  Single Review


Delete a single review for a bootcamp


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/reviews/64836bf57fb6b383fe429463
```



### 6. Update  review


update review details by the review owner or admin


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/reviews/6483708546373b971804e89f
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
  {  
            "rating": 1
   
           
        }
```



---
[Back to top](#devcamper-api)

>Generated at 2023-06-10 15:47:24 by [docgen](https://github.com/thedevsaddam/docgen)
