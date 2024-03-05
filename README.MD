## Turno, formerly TurnboverBnB - Test

This is a test proposed by Turno to build a simplified Bank System using PHP/Laravel and ReactJS.

This project contains the entire application splitted in folders/subprojects (frontend, backend and documentation) and make use of GitHub Pipeline CI to deploy each subproject as needed.

Still, AWS infrastructure is being used to release the project and all its resources is provisioned by IaC using serverless framework on each subproject (backend/frontend) folders.

MongoDB is being used for database.

### Environment

The application is packaged on Docker to be deployed on AWS, also it is using the Bref image to respond requests thought lambda functions.

https://bref.sh/docs/laravel/getting-started
https://bref.sh/docs/deploy/docker

**- `CACHE_DRIVER` was disabled to work on lambda.**

### Account Access

Below you can find all accounts needed to see ONLY the resources for the entire infrastructure with READ permission. 

```bash
# Amazon Web Services
url:
username:
password:
```

```bash
# MongoDB
url:
username:
password:
```