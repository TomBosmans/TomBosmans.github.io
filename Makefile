start:
	@docker compose start blog

stop:
	@docker compose stop blog

restart:
	@docker compose restart blog

up:
	@docker compose up -d

log:
	@docker compose logs -f blog

build:
	@docker compose build

shell:
	@docker compose run --rm --no-deps blog sh
