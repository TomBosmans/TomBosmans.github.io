---
title: How to setup GitHub Copilot on Neovim
date: 2023-03-24
tags: neovim, github copilot, editor, ai
---
GitHub Copilot is a powerful tool that uses OpenAI Codex to suggest code and entire functions in real-time right from your editor. It can help you write faster, smarter, and more confidently. In this post, I will show you how to install and use GitHub Copilot on Neovim, a popular and extensible text editor.

## Prerequisites

To use GitHub Copilot, you need to have an active GitHub Copilot subscription. You can sign up for a free trial or a paid plan on the [GitHub Copilot website](https://copilot.github.com/). GitHub Copilot is free for verified students, teachers, and maintainers of popular open source projects.

To use GitHub Copilot on Neovim, you need to have Neovim version 0.6 or above and Node.js version 17 or below installed. You can check your Neovim version by running `nvim --version` and your Node.js version by running `node --version` in your terminal. If you don't have them installed, you can follow the instructions on the [Neovim documentation](https://neovim.io/doc/user/) and the [Node.js website](https://nodejs.org/en/) to install them.

You also need to have packer.nvim, a use-package inspired plugin manager for Neovim. If you don't have it installed, you can follow the instructions on the [packer.nvim repository](https://github.com/wbthomason/packer.nvim).

## Installing the Neovim plugin

To install the GitHub Copilot plugin for Neovim, you can add it to your packer.nvim plugin specification in Lua, e.g. (in ~/.config/nvim/lua/plugins.lua):

```lua
return require('packer').startup(function(use)
 -- Other plugins ...
  use 'github/copilot.vim'
  -- More plugins ...
end)
```

Then you can run `:PackerSync` to install the plugin.

## Configuring the plugin

To configure the plugin, you need to open Neovim and run the following command:

```vim
:Copilot setup
```

This will prompt you to enter your GitHub username and password, and then generate an access token for GitHub Copilot. You can also enter your email address if you want to receive updates and tips from GitHub Copilot.

The plugin will also ask you if you want to enable GitHub Copilot by default in your Neovim configuration. If you choose yes, it will add the following line to your `init.vim` file:

```vim
let g:copilot_enabled = 1
```

If you choose no, you can still enable GitHub Copilot manually by running the following command:

```vim
:Copilot enable
```

You can also disable GitHub Copilot by running:

```vim
:Copilot disable
```

## Using the plugin

Once you have installed and configured the plugin, you can start using GitHub Copilot in Neovim. To see suggestions from GitHub Copilot, simply type some comments or code in any supported language. The suggestions will appear inline as you type, and you can accept them by pressing the `<Tab>` key. You can also cycle through multiple suggestions by pressing `<Tab>` repeatedly.

You can also trigger suggestions manually by running the following command:

```vim
:Copilot suggest
```

This will show a list of suggestions based on your current context. You can select one by using the arrow keys or typing its number, and then press `<Enter>` to insert it.

You can also ask GitHub Copilot to write an entire function for you by typing a comment with a function name and some parameters. For example, if you type:

```typescript
// Write a function that reverses a string
```

GitHub Copilot may suggest something like this:

```typescript
function reverseString(s: string): string {
  // Initialize an empty string
  let reversedS = "";
  // Loop through the characters of s from right to left
  for (let i = s.length - 1; i >= 0; i--) {
    // Append each character to reversedS
    reversedS += s[i];
  }
  // Return reversedS
  return reversedS;
}
```

You can accept the suggestion by pressing `<Tab>` or choose another one by pressing `<Tab>` again.

## Further reading

To learn more about GitHub Copilot and its features, you can visit the [GitHub Copilot website](https://copilot.github.com/) or read the [documentation](https://docs.github.com/en/enterprise-cloud@latest/copilot).
