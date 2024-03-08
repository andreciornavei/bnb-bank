## Turno, formerly TurnboverBnB - BnbBank Test

This is a test proposed by Turno to build a simplified Bank System using PHP/Laravel and ReactJS.

Application: https://bnb-bank.andreciornavei.com.br

![](https://github.com/andreciornavei/bnb-bank/blob/develop/docs/presentation.gif?raw=true)

This project contains the entire application splitted in folders/subprojects (frontend, backend and docs) and make use of GitHub Pipeline CI to deploy each subproject as needed.

Still, AWS infrastructure is being used to release the project and all its resources is provisioned by IaC using serverless framework on each subproject (backend/frontend) folders.

MongoDB is being used for database.

## Requirements met

### Backend requirements

- ⬜ Automated Tests / Test Coverage

- ✅ API Access Control (Policies, Gates, etc.)

- ✅ Implement a design pattern (DDD, Repository Pattern, etc.)

- ✅ Make a good and cohesive database design
![](https://github.com/andreciornavei/bnb-bank/blob/develop/docs/BnB-Bank-MER.png?raw=true)

### Frontend requirements

- ✅ TypeScript 

- ✅ Front-end cache

- ✅ Code structure and organization

- ⬜ Performance and monitoring tools

## Stategic Decisions

#### Docker + Bref (https://bref.sh/docs/deploy/docker)

Small applications does not need to consume paid services on AWS, in this case, the API was packaged on a Docker Image and deployed inside a Lambda Function with help of Bref, so the API will always be available for anyone who try to dispach a request against it, and of corse, using the Always Free Tier limit.

#### Uploads with AWS Presigned Url

Backend applications should not have to handle hard proccess like uploads, it could use a lot of cpu, memory and time, for that, was used uploads with presigned urls, where the backend just ask to AWS for a URL where upload can be made.

#### AWS S3 Bucket LifecycleConfiguration

`./backend/serverless -> resources.Resources.UploadBucket`

As users can abort deposit operations at any moment, it is important to remove temporary check uploads from bucket. For that, all temporary uploads are made on ./tmp folder on bucket, it contains a LifecycleConfiguration to remove the file in 24h. Once the deposit operation is finished successfully, the check file is moved from .tmp/ to ./deposits folder, where it will not be deleted anymore.


## Considerations

**Commits**: https://github.com/andreciornavei/bnb-bank/commits/develop/

Take a look at the commits timeline and see the development process, attempts to run CI/CD pipeline, mistake fixings, etc.