# Assumption

1. Assume deployment in Docker.
2. Assume the provided file in "/sales/record" is a genuine CSV file with header.

# Naming Convention

1. I use camel casing to name Javascript files, functions, variables.
2. For MongoDB, I use dash-case ("my-fashion-store") for database and camel casing for collections and fields of each collection.
3. For Python files, I use snake-case as common naming convention for Python files.
4. For shell files / Docker files, I use dash-case as well.

# Data Validation

1. For "USER_NAME" field, without further restriction (e.g. no symbols), I assume any characters will be accepted.
2. Since there is no given unique identifier from the CSV sample, I believe there could be more than one person with the same name in "USER_NAME" field. Therefore, I did not implement any duplicates check for "USER_NAME" field.
3. No negative number input should be accepted for "AGE", "HEIGHT", "SALE_AMOUNT".
4. Assume "HEIGHT" should not exceed 300cm. Also assume using cm as the measure for height.
5. Assume "AGE" should not exceed 130.
6. Assume "M", "F", "m", and "f" are the only allowed input for "GENDER" field.
7. Assume real world situation where most of the data will not be available since users might not be willing to provide their personal data upon purchases. Check emptiness is only applicable to "LAST_PURCHASE_DATE" since this is a data that must exist for each purchase. However, code are extendable that we can implement check emptiness easily.

# Design Pattern

1. Parsers, catchasync, AppError etc are all modularized and saved in the "utils" folder.
2. I put scripts that eases development but not used by the program in "bin" folder.
3. I use the ES2020 new feature "Optional Chaining (?)" to prevent "Uncaught TypeError: Cannot read property 'abc' of undefined".
4. Regarding error handling, I try to provide as much info as possible in "development" environment.
5. I make use of Docker for Mongodb with persistent storage on project directory to ensure files related to this project retain in project directory.
6. I use docker-compose to deploy the services (mongodb and my-fashion-store) altogether to ease deployment.

# How to improve the program further if there was more time

1. Allow the "/sales/record" API to accept more robust filename input instead of only files in root directory.
2. Implement logging to log files.
3. Probably can implement in-memory database Redis for faster query speed.
4. More checking on whether the given file in "/sales/record" is a genuine CSV file, having headers, or a empty file and duplicate records.
5. API "/sales/record" should first send the response as long as the data are validated and insert the data afterwards to avoid timeout issue.
6. Create handling for production environment.
7. Allow switching between handling small and large datasets (with more than 30m row) for "/sales/record"  
   a. For small dataset, return response together with number of data inserted.  
   b. For large dataset, return response first and then do the insertion of data with streams afterwards.
8. Implement data validation on input for "USER_NAME" to only English characters.
9. Implement duplicates check to avoid inserting the same data twice.
10. When there are large number of records (>10,000) to be returned from "/sales/report", implement sorting e.g. on last_purchase_date etc to ensure the filtered results (only 10,000) displayed are properly sorted.
11. Better error handling that allows jest to catch easily.
12. Regarding additional service to trigger data feed in, I will build 2 APIs, one for generating csv file, one serve as a call to call csv generator and also /sales/record to trigger automation of data feed in. It will be deployed to 2 Docker containers.
13. As I have never worked on streaming before, working on this project allows me to learn a lot on streaming and handling big dataset. I wish I have more time to dig deeper on work better on it.
