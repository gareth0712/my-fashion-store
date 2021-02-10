# my-fashion-store

Regarding design decisions, please refer to DECISIONS.md

# Prerequisites

1. You have Docker v20 or above installed
2. You have Node v15 or above installed
3. [Recommended] You have Mongo shell available

# Setup MongoDB in Docker (With verification)

1. Go to project directory `cd my-fashion-store`
2. Create folder for mongodb `mkdir -p mongodb/database`
3. Pull Docker image for mongo `docker pull mongo`
4. Run MongoDB service `docker-compose up -d mongodb`
5. [Steps 5 to 8 are optional for verifying whether you have set up persistent storage appropriately]Get in MongoDB and create a document using the db name 'my-fashion-store-dev' and in 'sales' collection

```
$ docker exec -it mongodb bash
/# mongo
> use my-fashion-store-dev
> db.sales.find()
> db.sales.insert({abc: 1})
WriteResult({ "nInserted" : 1 })
> db.sales.find()
{ "_id" : ObjectId("60217ca445624acd8cffb7d6"), "abc" : 1 }
```

6. After that, exit and remove the mongodb service and run it again to verify whether the storage is persistent

```
> exit
Bye
/# exit
exit
$ docker-compose stop mongodb
Stopping mongodb ... done
$ docker-compose rm mongodb
Going to remove mongodb
Are you sure? [yN] y
Removing mongodb ... done
--- Creating the service again ---
$ docker-compose up -d mongodb
Creating mongodb ... done
```

7. If you have Mongo shell, you can connect to it directly. Otherwise, you can connect to the mongodb container using the above method

```
$ mongo --port 27031
> db.sales.find()
{ "_id" : ObjectId("60217ca445624acd8cffb7d6"), "abc" : 1 }
```

8. If you see { "abc" : 1}, congratulations, you have persistent storage for mongodb

# Build procedures and Deploy procedures without Docker

1. Clone the project
2. Go to project directory `cd my-fashion-store`
3. Run `yarn install`
4. Run `yarn start`
5. Visit http://localhost:8081

# Build procedures (For Docker)

1. Run `./docker-build.sh` or the following if you are Windows user

```
docker build -t my-fashion-store:latest .
```

# Deployment Procedures (For Docker)

1. You should have built the Docker image "my-fashion-store:latest" (Follow Build procedures - Docker image) and have MongoDB image ready (Follow "Setup MongoDB in Docker", recommended to be tested for persistent storage)
2. Run the following

```
$ docker-compose up -d
Starting mongodb ... done
Recreating myfashionstore ... done
```

3. Visit http://localhost:8081/ to see if you get `{ "status": "success" }` as result

# API References

`GET /sales/report`

- Without providing any parameters - Show all sales record
- `Query parameter "startDate"` If given, the API returns records since the provided date and the date will be included. Suggested format: YYYY-MM-DD. e.g. http://localhost:8081/sales/record?startDate=2020-01-01
- `Query parameter "endDate"` If given, the API returns records before the provided date and the date will not be included. Suggested format: YYYY-MM-DD. e.g. http://localhost:8081/sales/record?endDate=2020-01-01
- Combining the use of startDate and endDate, you can specify the preferred date range. e.g. http://localhost:8081/sales/record?startDate=2020-01-01&endDate=2020-01-01

`POST /sales/record`

- Body: { "path": "csv/filename" } e.g. { "path": "csv/sample.csv" }
- Currently only support csv files in "csv" folder

# Test

Run the following to start testing (Make sure you have run `yarn install` from the beginning)

```
yarn run test
```
