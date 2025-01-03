FROM maven:3.6.3-openjdk-17 AS MAVEN_BUILD

COPY pom.xml /build/
COPY src /build/src/

WORKDIR /build/
RUN mvn clean package

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/acko-tool-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 5010
ENTRYPOINT ["java", "-jar", "app.jar"]