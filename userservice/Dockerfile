FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=countrydb
ENV MYSQL_USER=app_root
ENV MYSQL_PASSWORD=root123
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/countrydb
ADD ./target/userservice-0.0.1-SNAPSHOT.jar /usr/src/userservice-0.0.1-SNAPSHOT.jar 
ENTRYPOINT ["java", "-jar","userservice-0.0.1-SNAPSHOT.jar"]
