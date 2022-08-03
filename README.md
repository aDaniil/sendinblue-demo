# Serverless Cloud + Sendinblue Transactional Email Service

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Femrahssamdan%2Fsendinblue-demo%2Ftree%2Fmain)

This project aims to provide an example on how to trigger a transactional email using Sendinblue. When a user first signs up, we saved this user to Serverless Data. Save operation to Serverless Data triggers an asynchronous event to save this user as a contact to our CRM in Sendinblue. We trigger an event to send the transactional email finally using our `events` interface with Serverless Events. See the tentative flow diagram. 

![sendinblue](https://user-images.githubusercontent.com/85096820/179057913-eda8eb2d-664a-4d47-8b8c-87f0f3407f0b.png)
