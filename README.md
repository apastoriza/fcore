# fcore
defines three applications:

 * gateway: a single entry point to the microservices, that will include the UI components.
 * customer: a costomer microservice.
 * account: a bank account microservice.
 * contract: contract base microservice.

 ## Docker images for microservice apps
When the configuration is generated for Docker Compose, a warning is spat out to the console. Then "just jib it" using Jib.
```
mvn -Pprod verify com.google.cloud.tools:jib-maven-plugin:dockerBuild
````

### Run Java microservices stack with Docker Compose
Once everything has finished building, cd into the docker-compose directory and start all your containers.
```
cd docker-compose
docker-compose up -d
````
