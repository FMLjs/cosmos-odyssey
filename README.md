
# Cosmos Odyssey

Web App called “Cosmos Odyssey” that shows the best deals for our demanding customers in our solar system. Customers must be able to select travel between the different planets and the system should show possible routes-based prices. After careful consideration customer can choose to make a reservation to their name on a specific route.
## Prerequisites

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/current/) (version should be >=17.1.0) and the [yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). 
* Nest CLI - [Download & Install NestJs CLI](https://docs.nestjs.com/cli/overview) (Installation part)
* PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/). You can also use [Docker](https://www.docker.com) to install postgres. I provided a ready-made [compose file](https://github.com/FMLjs/cosmos-odyssey/blob/main/docker-compose.yml), which is located in the root derictory of the project. Use "docker-compose -f {path_to_compose_file} up" command in your terminal to create postgres container.

## Run Locally

Clone the project

```bash
  git clone https://github.com/FMLjs/cosmos-odyssey.git
```

Go to the project directory

```bash
  cd cosmos-odyssey
```

Prepare environment file

Create a new .env file in the root directory of the project. Copy the contents of the .env.example file into your newly created .env file and replace the properties TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE, TYPEORM_PORT with the settings on your local system.

Install dependencies

```bash
  yarn install
```

Run migrations (this will create all project tables in your postgres database)

```bash
  yarn migration:run
```

Start the server

```bash
  yarn start:dev
```


## Afterword

* The system can be built using CRON, making requests every n minutes, thereby removing the need to check the relevance of the price list.
* To optimize the current implementation of the PriceListService.findLatest function, you can return an error if the price list is out of date without creating a new price list (at the moment, if the price list is outdated, then a new one is created in the same API request), thereby reducing the number of calls to database from 2 to 1 in one execution of this function. In this case, the client must make sure that he received the price list, and in case of an error, make a second request.