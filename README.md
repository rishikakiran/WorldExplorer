# WorldExplorer
## Problem Description
1. To build a system to search for country and list matching countries, show details of a selected country and bookmark favourite country. See screenshots in `documentation.docx`.
 

## To Run the application

1. Clone the project into your system using `https://github.com/rishikakiran/WorldExplorer.git`.
2. Inside the project folder, open git-bash in windows or terminal in ubuntu.
 

## CONFIGURE YOUR MYSQL

1. To build the project in your local system. Make sure your Mysql is running at first.
2. Create a DB `countrydb` using the command `create database countrydb;` in your root user.
 

# BUILD userservice
1. To build user service, go inside the userservice folder.
2. Run the following commands:
3. `source ./env-variable.sh`
4. `mvn package`
 

# BUILD favouriteservice
1. To build favourite service, go inside the favouriteservice folder.
2. Run the following commands:
3. `source ./env-variable.sh`
4. `mvn package`
5. Check that target folders are created inside your services and jars are presesnt in them.
 

# BUILD WorldExplorerUI
1. To build the angular app, open cmd inside the WorldExplorerUI.
2. Run the following commands:
3. `npm install`
4. `npm install --save jwt-decode`
5. `npm install --save @angular/flex-layout`
6. Go inside dist. Copy the contents of WorldExplorerUi folder inside the dist.

# RUN THE DOCKER
1. Make sure your local Mysql is not running. If in windows stop the service from "services". In ubuntu run `sudo service mysql stop`
2. Make sure docker is installed and running in your system.
3. In the project folder run the following docker command `sudo docker-compose up --build`
