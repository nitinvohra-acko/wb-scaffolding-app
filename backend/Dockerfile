FROM maven:3.6.3-openjdk-17 AS MAVEN_BUILD

COPY pom.xml /build/
COPY src /build/src/

WORKDIR /build/
RUN mvn package

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/spring-boot-3-rest-api-example-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-jar", "spring-boot-3-rest-api-example-0.0.1-SNAPSHOT.jar"]