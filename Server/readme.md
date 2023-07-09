# CraftVillageServer
This project is a Web Server manage , with **Express**, **TypeScript**

# Installation
Create file ```/.env``` with contents:
```
PORT=3001
JWT_EXPIRES_IN=30
APP_SECRET=craftvillages
MONGO_URI=<YOUR_MONGODB_URI>
SESSION_SECRET=craftvillages
MAILER_PASSWORD=<your_app_token>
MAILER_USERNAME=<your_email>
```

Open terminal run this command:
```
npm install
```

Run the server with command:
```
npm start
```
****

# Usage
Available routes, use **Postman** for more info
* POST - **/auth/signup**, **/auth/signin**  with the body look like this:
  ```
  {
    "password":"11111111",
    "confirmPassword":"11111111",
    "email":"abc@handicraft.vn",
  }
  ```
nav122333 - 12/06/2023
* POST - **/notification/create**  with the body look like this:
  ```
  {
    "sender":"<sender UID 1>",
    "sendemail":"<true | false>",
    "receivers":[
      "<receiver UID 1>", 
      "<receiver UID 2>",
      ...
    ],
    "header":"This is title",
    "body":"Bodytext"
  }
  ```
* POST - **/notification/fetch**  with the body look like this:
  ```
  {
    "id":"<reveicer uid>",
    "filter":{ //this is optional
      "read": "true",
      ...
    }
  }
  ```
* GET - **/notification/read/\<notificationID>** will get the notification has _id = \<notificationID>
  
nav122333 - 01/06/2023

* POST - **/notification/markunread/\<notificationID>** will set the notification has _id = \<notificationID> as _Unread message_

nav122333 - 12/06/2023

* POST - **/report/create**  with the body look like this (create Notification and send Email included):
  ```
  {
    "sendEmail":false|true,
    "village_id":"6486c9f1160affe79b0a1155",
    "product_id":"6486d378160affe79b0a115a",
    "quantity":10| default:0
  }
  ```
* GET - **/report/getallreports/64867268e0b4093f7089f5af** retrieve all reports whose villages _user(64867268e0b4093f7089f5af)_ manages:

* POST - **/report/getallreports/64867268e0b4093f7089f5af** retrieve all reports with filters as request's body:
  ```
  {
    // coming soon (find by village, find by date, )
  }
  ```
nav122333 - 15/06/2023