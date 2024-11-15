FROM maven:3.9-amazoncorretto-17-alpine AS build

WORKDIR /phuocanh/linux-final

COPY pom.xml /phuocanh/linux-final/pom.xml
RUN mvn dependency:go-offline

COPY src /phuocanh/linux-final/src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /phuocanh/linux-final

COPY --from=build /phuocanh/linux-final/target/*.jar /phuocanh/linux-final/app.jar
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 8080

ENTRYPOINT ["/wait-for-it.sh", "db-mysql:3306", "--", "java", "-jar", "/phuocanh/linux-final/app.jar"]

LABEL maintainer="Trần Phước Anh anhtp.22it@vku.udn.vn" \
      version="1.0" \
      description="Đồ Án Cơ Sở 4 Project" \
      license="MIT" \
      copyright="Copyright (c) 2024 Trần Phước Anh"
