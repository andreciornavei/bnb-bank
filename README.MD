## Turno, formerly TurnboverBnB - BnbBank Test

This is a test proposed by Turno to build a simplified Bank System using PHP/Laravel and ReactJS.

Application: https://bnb-bank.andreciornavei.com.br

![](https://github.com/andreciornavei/bnb-bank/blob/develop/docs/presentation.gif?raw=true)

This project contains the entire application splitted in folders/subprojects (frontend, backend and docs) and make use of GitHub Pipeline CI to deploy each subproject as needed.

Still, AWS infrastructure is being used to release the project and all its resources is provisioned by IaC using serverless framework on each subproject (backend/frontend) folders.

MongoDB is being used for database.

### Environment

The application is packaged on Docker to be deployed on AWS, also it is using the Bref image to respond requests thought lambda functions.

https://bref.sh/docs/laravel/getting-started
https://bref.sh/docs/deploy/docker

**- `CACHE_DRIVER` was disabled to work on lambda.**

### Stategic decisions

#### Docker + Bref (https://bref.sh/docs/deploy/docker)

#### AWS Presigned Url

#### AWS S3 Bucket LifecycleConfiguration

`./backend/serverless -> resources.Resources.UploadBucket`

As users can abort deposit operations at any moment, it is important to remove temporary check uploads from bucket. For that, all temporary uploads are made on ./tmp folder on bucket, it contains a LifecycleConfiguration to remove the file in 24h. Once the deposit operation is finished successfully, the check file is moved from .tmp/ to ./deposits folder, where it will not be deleted anymore.


