# How to build and test Cloud applications with LocalStack and Docker

This repo contains the sample application for [Building and testing Cloud applications with LocalStack and Docker guide on Docker Docs](https://github.com/ajeetraina/todo-list-localstack-docker).
This simple to-do List application allows developers to upload images to S3-emulated LocalStack and add task lists to the local MongoDB database.

Notice: This sample repo is intended to support the guide mentioned above. As such, the application code is purposely kept simple to keep the focus on the guide's content and should not be considered production ready.

## Tech Stack

<img width="827" alt="image" src="https://github.com/user-attachments/assets/b3a7ac49-eec5-4f6c-ac6a-eff19647b667">



- Frontend: React, Material UI.
- Backend: Node.js, Express
- Database: Mongo(running locally for storing tasks)
- Object Storage: Localstack (for emulating S3 and storing images locally for testing purposes)

## Project Structure

This project contains the following components:
- **/backend** - This directory contains the Node.js application that handles the server-side logic and interacts with the database. This directory contains configuration settings for uploading images to LocalStack (emulated AWS S3). The uploadConfig.js file is responsible for configuring the S3 client to connect to the LocalStack S3 endpoint. This allows the backend application to store and retrieve images associated with the Todo List items.
- **/frontend** - The frontend directory contains the React application that handles the user interface and interacts with the backend. 
  
## Development

1. Clone the repository

```
git clone https://github.com/ajeetraina/todo-list-localstack-docker
```

2. Navigate into the project.

```
cd todo-list-localstack-docker
```

To launch this project, you have two options - run the app natively (without containers) or run everything in containers.

## Option one - Run the app natively

## Bring up LocalStack and Mongo containers

To run the app natively, you will need to run LocalStack and Mongo using Docker Compose while run frontend and backend locally.

```
docker compose up -d
```

```
docker compose up -d
[+] Running 4/4
 ✔ Network todo-container-supported_default      Created                           0.1s
 ✔ Volume "todo-container-supported_mongo-data"  Created                           0.0s
 ✔ Container mongo                               Started                           0.4s
 ✔ Container localstack                          Started                           0.3s
```

<img width="1307" alt="image" src="https://github.com/user-attachments/assets/d643f92c-c7e3-4ebe-a3c1-9288deb14083">


## Verify if Localstack is up and running

<img width="762" alt="image" src="https://github.com/user-attachments/assets/ac832aeb-a9e8-4ae5-a2ca-8c538259023e">



## Add a Sample S3 Bucket

```
aws --endpoint-url=http://localhost:4566 s3 mb s3://mysamplebucket
```

It should show the following result:

```
make_bucket: mysamplebucket
```

## Bring up Backend

```
npm install
node index.js
```

```
Server is running on port 5000
Connected to MongoDB
```

## Start the frontend

Open a new terminal and run the following command:

```
npm start
```

By now, you should see the following message

```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.3:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

## Try adding task and uploading the image


![image](https://github.com/user-attachments/assets/55ca86c0-c83b-4f5e-83d2-0e87c97ba48a)

It shows the image is successfully uploaded.

## Check the LocalStack container logs

<img width="1337" alt="image" src="https://github.com/user-attachments/assets/e29f1a72-13a7-45d0-b55b-23a396916bfa">

## Check the Mongo container logs

```
# mongosh
Current Mongosh Log ID: 66cb1093118d7d4cc1c76a8a
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0
Using MongoDB:          7.0.12
Using Mongosh:          2.3.0

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting
   2024-08-25T10:58:46.918+00:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
   2024-08-25T10:58:47.668+00:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
   2024-08-25T10:58:47.668+00:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never' in this binary version
   2024-08-25T10:58:47.668+00:00: vm.max_map_count is too low
------

test> show dbs
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB
todos    8.00 KiB
test> use todos
switched to db todos
todos> db.todos.countDocuments()
2
todos> db.todos.countDocuments()
3
todos> 
```

## Option two - Run everything in containers

To run everything out of containers, you can leverage the Docker Compose configuration in the project.

<tbd>
