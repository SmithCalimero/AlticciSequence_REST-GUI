# Alticci Sequence GUI + REST Service

This project consists of :
- A REST service, using the Quarkus Java framework, that returns a value from the Alticci sequence.

- An Angular GUI that lets you input the number and receive the corresponding result from the service.

The Alticci – a(n) - sequence is defined as follows:

n=0 => a(0) = 0

n=1 => a(1) = 1

n=2 => a(2) = 1

n>2 => a(n) = a(n-3) + a(n-2)

(the values can't be negative)

Example of the first sequence values:

0, 1, 1, 1 ,2 ,2 ,3 ,4 ,5 ,7 ,9, [...]

## Requirements

For the REST Service:

- Java JDK to be installed ( I used 17 )

- Maven ( 3.6.3 because of compatibility issues ). This was used to create the Quarkus project.

For the Angular GUI:

- NodeJS

## Running the Quarkus service

Open a terminal inside the `alticci-rest-service` folder and run `./mvnw install`. Then, after it concludes, run `./mvnw quarkus:dev` for a dev server.

The endpoints of the service are in the form `localhost:8080/alticci/{n}` where `{n}` represents the index of the sequence’s value to return.

It will automatically execute some tests I created to check if the service is working as intended:
- Checks if the results of inputting the first 11 numbers ( 0 to 11 ) are correct based on their expected value from the sequence information.
- Checks the case of inputting a negative number and if the service throws the exception.

You may also use it with Docker! Simply run `./mvnw package -Pnative -Dquarkus.native.container-build=true -Dquarkus.container-image.build=true` and when the image is built run it with the following command `docker run -i --rm -p 8080:8080 <image-name>`. Simply use the endpoints normally with `localhost:8080/alticci/{n}`.

## REST API Documentation

With the service running go to `localhost:8080/openapi` to get the REST API documentation.
In case you simply want to check the documentation without running the service running go to the `alticci-rest-service/swagger` folder and the YAML file is there.

You can also visit `http://localhost:8080/swagger-ui` for an interactive experience with the documentation.

## Angular GUI

Open a terminal inside the `alticci-app` folder and run `npm install`. After it completes, you can now run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

You can input any valid number in the GUI ( it has to be equal or greater than 0 ) and it will use the REST Service to retrieve the corresponding value.

This GUI deals with the possible errors like the server being offline and the inputted value being negative ( ex: -1 ) or invalid ( a letter / symbol ).

It was implemented with Tailwind CSS to make the GUI prettier + RxJS to help with Observables and make it easier to compose asynchronous code.

## Further information

You can check the README.md files inside each folder. They are the ones that are automatically generated and contain information I didn't think I should repeat here. The code is commented to clarify implementation options.
