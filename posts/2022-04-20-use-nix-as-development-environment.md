---
title: Use nix as development environment.
date: 2022-04-20
tags: nix
---
Nix is a tool that takes a unique approach to package management and system configuration.
It can be used to replace `brew` on macos with the benefit to setup dev environemnts per project.
For more info about nix: https://nixos.org/ 

## shell.nix
We are going to setup a dev environment for a node project using postgres in this example.
In the project root add a new file named `shell.nix`.
```nix
with (import <nixpkgs> {});
mkShell {
  name = "My node project";
  buildInputs = [
    postgresql_13
    nodejs-16_x
  ];

  PGDATA = "${toString ./.}/.pg";

  shellHook = ''
    export PGHOST="$PGDATA"
    export PGUSER="postgres"
    [ ! -d $PGDATA ] && pg_ctl initdb -o "-U postgres"
  '';
}
```

So when we now run `nix-shell` it will create a `.pg/` folder with everything we need to run our postgres server.
We don't want to commit this in our git so add in your `.gitigore`
```git
.pg
```

## Autoload dev environment
You might notice that we always open a bash shell when running `nix-shell`, we can fix this and make the process of loading our dev environment automatic with `direnv`.
First we need to install direnv with nix:
```shell
nix-env -i direnv
```

Add a new `.envrc` file in the root of our project:
```shell
use_nix
```

If you are using `zsh` add the following to your `zshrc`:
```shell
eval "$(direnv hook zsh)"
```

Now run the following in the root of your project:
```shell
direnv allow .
```

And thats it, from now on when you `cd` into your project folder it will autmagicly load your dev environemnt.
