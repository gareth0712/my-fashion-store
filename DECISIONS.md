# Assumption

1. All csv file should not contain empty input or the file will be rejected by "/sales/record" API.
2. Assume deployment in Docker.
3. Assume the provided file in "/sales/record" is a genuine CSV file with header.

# Naming Convention

1. I use camel casing to name Javascript files, functions, variables.
2. For MongoDB, I use dash-case ("my-fashion-store") for database and camel casing for collections and fields of each collection.

# Data Validation

1. Any csv file that doesn't follow this standard of Data Validation will be rejected by the "/sales/record" API.
2. Since there is no given unique identifier from the CSV sample, I believe there could be more than one person with the same name in "USER_NAME" field. Therefore, I did not implement any duplicates check for "USER_NAME" field.
3. No negative number input should be accepted for "AGE", "HEIGHT", "SALE_AMOUNT".
4. Assume "HEIGHT" should not exceed 300cm. Also assume using cm as the measure for height.
5. Assume "AGE" should not exceed 130.
6. Assume "M", "F", "m", and "f" are the only allowed input for "GENDER" field.
7. Assume real world situation where most of the data will not be available since users might not be willing to provide their personal data upon purchases. Check emptiness is only applicable to "LAST_PURCHASE_DATE" since this is a data that must exist for each purchase. However, code are extendable in the sense that whenever necessary, we can make check emptiness available whenever necessary.
8. For "USER_NAME" field, without further restriction (e.g. no symbols), I assume any characters will be accepted.

# Design Pattern

1. Parsers, catchasync, AppError are all modularized and saved in the "utils" folder.
2. Regarding sales report, if any unique identifier for each user is given, I will do a summary of each member's details.
3. I use the ES2020 new feature "Optional Chaining (?)" to prevent "Uncaught TypeError: Cannot read property 'abc' of undefined".
4. Regarding error handling, I try to provide as much info as possible in "development" environment
5. I put scripts that eases development but not used by the program in "bin" folder.

# How to improve the program further if there was more time

1. Allow the "/sales/record" API to accept more robust filename input instead of only files in root directory.
2. Implement logging to log files.
3. Probably can implement in-memory database Redis for faster query speed.
4. More checking on whether the given file in "/sales/record" is a genuine CSV file, having headers, or a empty file and duplicate records.
5. API "/sales/record" should first send the response as long as the data are validated and insert the data afterwards to avoid timeout issue.
6. Create handling for production environment.
7. Implement limitation on records to be returned by "/sales/report" to avoid crashing the program when there are too many records in the database
8. Handle large datasets (with more than 1m row).
