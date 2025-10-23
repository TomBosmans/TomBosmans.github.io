---
title: Docker compose as dev environment
date: 2025-10-23
tags: Docker, Development, Node.js, PostgreSQL, DevOps
---

# The Problem

In my first two jobs, I worked on large, long-running applications. I rarely had to switch between different versions of databases or languages — except during the occasional upgrade.
Then came my third job, working at an agency, where more and more diverse projects started landing on my desk. Suddenly, I was juggling different Node versions, different PostgreSQL versions, and so on.

You might wonder: why does that matter so much?
Well, let me share a story.

At one point, I worked on a big SQL query that calculated people’s balance hours based on their contracts and planning data. The original logic was written in JavaScript, and recalculating all users’ balance hours took 45 minutes!

After convincing my PO that, yes, we had “a lot” of usage but not that much data for a SQL database, I explained one key issue — JavaScript doesn’t have true decimals, and floats can be inaccurate:
```javascript
> 0.2 + 0.7
0.8999999999999999

> 0.2 + 0.7 === 0.9
false
```
We got the green light to move the logic inside the database. It was challenging — but incredibly fun, and I learned a ton working on that query with my coworkers.
In the end, we did it! Our new SQL query ran in just 200ms for all users instead of 45 minutes. We pushed it to QA and celebrated… until our PO told us it was actually slower than before.

Impossible, right? We had tested it so many times!
But sure enough, on QA it was slower — while locally, it was lightning fast.

After some digging, my coworker discovered the culprit: we had used [CTEs](https://www.postgresql.org/docs/current/queries-with.html) (Common Table Expressions) to make the query more readable. Locally, we were running PostgreSQL 13, where CTEs are optimized. But on the QA server, although PostgreSQL 11 already had CTEs it did not have the optimization (That optimization wasn’t introduced until version 12 or 13.)

After upgrading PostgreSQL on the servers, everything ran beautifully and we could finally celebrate — for real this time.
But the whole experience made me think: what if upgrading hadn’t been an option? We could have wasted even more time rewriting the entire query to avoid CTEs.

The same kind of issue can happen anywhere — for example, using a new Node.js feature that doesn’t exist in an older version.
That’s why it’s so important to ensure your local environment matches your production environment — same versions of your tools, languages, and databases. It can save you countless hours of confusion and debugging.

# The Possible Solutions

I already wrote about my experiments with [using Docker to manage my Postgres versions](/#/2022-04-10-postgresql-version-management-with-docker), something I was first introduced to in my second job.
That setup worked great, and for Node I could rely on [nvm](https://github.com/nvm-sh/nvm) to manage versions.
But once I started using more languages, things got complicated — I had to find and manage a different version manager for each one.

So I started looking into [asdf](https://github.com/asdf-vm/asdf), which seemed perfect — one tool to manage all runtimes!
Unfortunately, there was one major issue: it **significantly slowed down my shell startup**.
And since I spend most of my time in the terminal, a slow shell just isn’t something I can live with.

Next, I experimented with [Nix](/#/2022-04-20-use-nix-as-development-environment).
While I loved the idea behind it, the experience on macOS wasn’t exactly smooth.
Builds often failed, and troubleshooting those failures quickly became a time sink.
On top of that, switching from Homebrew to Nix felt painful — and Nix ended up taking over my Mac in ways I didn’t expect or enjoy.
Not the mention the high learning curve of Nix, you really need to spend some time with it and you can't expect everyone to do this in your team.
Eventually, I gave up and did a **clean macOS install** just to remove it completely.

Around that time, some of my coworkers kept going on about wanting to use Docker, but they never actually took the plunge.
I was already using it to manage my Postgres version and to run a few things on my NAS at home, but I hadn’t explored it much beyond that.
Eventually, I started experimenting with [Docker Compose](https://docs.docker.com/compose/) — and that’s when things really clicked.

I came up with a setup that I **still use today** for my own projects.
It’s much more common now, but discovering it on my own felt like a small personal breakthrough — and that’s exactly why I wanted to write this blog post.

# The Solution

A typical project structure at our company consisted of a **NestJS backend** and a **React SPA frontend**.  
Everything ran through **Docker Compose**, making local development easy to setup and switch between projects.

`folder structure`
```bash
backend/
├── src/
├── Dockerfile
frontend/
├── src/
├── Dockerfile
docker-compose.yml
Makefile
.env

```

`backend/Dockerfile`
```Dockerfile
FROM node:24-alpine
WORKDIR /backend
EXPOSE 3000
RUN npm install -g npm@latest
CMD ["npm", "run", "dev"]
```

`frontend/Dockerfile`
```
FROM node:24-alpine
WORKDIR /frontend
EXPOSE 3000
RUN npm install -g npm@latest
CMD ["npm", "run", "dev"]
```

> Tip: For frameworks with CLIs (like NestJS), install them globally: `RUN npm i -g @nestjs/cli`

> The WORKDIR matches the Docker Compose service name — so when you shell into a container, you always know where you are (/backend, /frontend, etc).

`docker-compose.yml`
```yaml
services:
  backend:
    container_name: ${APP_NAME}_backend
    build:
      context: backend
      dockerfile: Dockerfile
    stdin_open: true
    env_file:
      - .env
    ports:
      - ${BACKEND_PORT}:3000
    volumes:
      - ./backend:/backend

  frontend:
    container_name: ${APP_NAME}_frontend
    build:
      context: frontend
      dockerfile: Dockerfile
    env_file:
      - .env
    stdin_open: true
    ports:
      - ${FRONTEND_PORT}:3000
      - ${FRONTEND_HMR_PORT}:3010
    volumes:
      - ./frontend:/frontend

  postgres:
    container_name: ${APP_NAME}_postgres
    image: postgres:18-alpine
    env_file:
      - .env
    ports:
      - ${POSTGRES_PORT}:5432
    volumes:
      - postgres:/var/lib/postgresql/data

volumes:
  postgres:
```
> Docker Compose automatically reads your .env file

> You can easily extend this setup with tools like:
>  - Mailpit: for local email testing
>  - MinIO: for local S3-compatible object storage

`.env`
```bash
APP_NAME=example

BACKEND_URL=http://localhost
BACKEND_PORT=3100

FRONTEND_PORT=3000
FRONTEND_HMR_PORT=3010

POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
```

`Makefile`
```shell
include .env

start:
	@docker compose start $(service)

stop:
	@docker compose stop $(service)

restart:
	@docker compose restart $(service)

up:
	@docker compose up -d

build:
	@docker compose build

log:
	@if [ -z "$(service)" ]; then \
		docker compose logs -f --tail 10000; \
	else \
		docker compose logs -f --tail 10000 --no-log-prefix $(service); \
	fi

status:
	@docker compose ps -a --format "{{.Label \"com.docker.compose.service\"}}|{{.Status}}" $(service) | column -t -s "|"; \

shell:
	@docker compose exec $(service) sh || { \
		echo "\033[38;5;214m[!] Fallback to 'docker compose run'\033[0m"; \
		docker compose run --rm --no-deps $(service) sh; \
	}

psql:
	@docker compose exec postgres sh -c "su - postgres -c 'psql $(db)'"

browse:
	open http://localhost:$($(shell echo ${service}_PORT | tr '[:lower:]' '[:upper:]'))
```

## Usage
We use Docker’s file-sharing feature — meaning our local code (./backend, ./frontend) is live-mounted into the running containers.

That gives us hot reloads inside Docker and easy access to CLI commands.

| Command                         | Description                                   |
|---------------------------------|-----------------------------------------------|
| make up                          | Start all containers in detached mode        |
| make start service=backend       | Start backend specific service                       |
| make stop service=frontend       | Stop frontend specific service                       |
| make shell service=backend       | Open a shell inside the backend container    |
| make log service=frontend        | Tail logs from frontend container          |
| make psql                        | Open psql inside the Postgres container      |
| make browse service=frontend     | Open the service’s URL in the browser        |

`Example:`
```shell
make shell service=backend
# → inside backend container
npm install
npm run test
```


# The Cost

As with everything, there is a cost to pay for this setup—mainly if you are on **Windows** or **Mac**.

Since we are using Docker’s **file-sharing feature**, there is a VM layer in between on these OSes (because they are not Linux). Naturally, this introduces a **performance cost**: running tests, builds, or other file-heavy operations can be slower.

In a bigger project I worked on at an agency, I was unable to make it run smoothly, but on Mac, the performance of file sharing has improved a lot since then.  

For me, it’s worth it: in a typical agency project, the performance cost is usually minimal, and for hobby projects, it’s effectively **zero**. If you are using **Linux** (like I am writing this), you probably won’t notice any significant cost.

Another minor issue I’ve encountered occasionally is a **desync**—probably caused by the VM layer on Mac. Running `make restart` usually fixes it, but it can cause some temporary confusion.

Finally, there’s the subtle cost of knowing when to use **localhost** versus the internal Docker network. It’s not always obvious at first, so some attention is needed.  

Overall, there’s a bit more work upfront, but once it’s set up, it **works reliably for everyone on the team**.

# Summary
Using Docker Compose as a development environment allows you to:

- Match production and local environments precisely.
- Switch between multiple versions of Node, Postgres, or other runtimes effortlessly.
- Enable hot reload and CLI access without polluting your local machine.

It’s not perfect, but it’s consistent, reliable, and team-friendly—especially for agencies juggling many projects or for hobby projects.
