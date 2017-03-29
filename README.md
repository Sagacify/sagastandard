# Javascript Saga-Standard style
### One Standard to bring them all, and in the darkness bind them.

Based on [feross/standard] and [Flet/semistandard] with a few additionnal opiniated style rules.

## Install
```bash
npm install -g sagastandard
```

## Rules
Importantly:
- **1tbs**: check [one-true-brace-style](http://eslint.org/docs/rules/brace-style)
- **curly**: always require braces
- **max-len at 80**: except for urls.
- **NO console.log**
- **NO debugger;***
- **semicolons** check [Flet/semistandard]
- Check [feross/standard] for the rest of the rules.

## Usage

The easiest way to use JavaScript Saga-Standard Style to check your code is to install it globally as a Node command line program. To do so, simply run the following command in your terminal (flag `-g` installs `sagastandard` globally on your system, omit it if you want to install in the current working directory):

```bash
npm install sagastandard -g
```

After you've done that you should be able to use the `sagastandard` program. The simplest use case would be checking the style of all JavaScript files in the current working directory:

```
$ sagastandard
Error: Use JavaScript Saga-Standard Style
  lib/torrent.js:950:11: Expected '===' and instead saw '=='.
```

### Editor plugins

There are currently no editor plugins directly supporting Saga-Sandard, but the following plugins can be customized to use it.

- **Sublime users**: Try [SublimeLinter-contrib-semistandard](https://github.com/Flet/SublimeLinter-contrib-semistandard) for linting in your editor!
- **Atom users** - Install [linter-js-standard](https://atom.io/packages/linter-js-standard)

### What you might do if you're clever

1. Add it to `package.json`

  ```json
  {
    "name": "my-cool-package",
    "devDependencies": {
      "sagastandard": "*"
    },
    "scripts": {
      "test": "sagastandard && node my-normal-saga-styled-tests.js"
    }
  }
  ```

2. Check style automatically when you run `npm test`

  ```
  $ npm test
  Error: Code style check failed:
    lib/torrent.js:950:11: Expected '===' and instead saw '=='.
  ```

3. Never give style feedback on a pull request again! (unless it's about semicolons)

### Custom Parser
To use a custom parser, install it from npm (example: `npm install babel-eslint`) and add this to your package.json:

```json
{
  "sagastandard": {
    "parser": "babel-eslint"
  }
}
```

### [Vim](http://www.vim.org/)

Install **[Syntastic][vim-1]** and add these lines to `.vimrc`:

```vim
let g:syntastic_javascript_checkers=['standard']
let g:syntastic_javascript_standard_exec = 'sagastandard'
```

For automatic formatting on save, add these two lines to `.vimrc`:

```vim
autocmd bufwritepost *.js silent !sagastandard % --fix
set autoread
```

[vim-1]: https://github.com/scrooloose/syntastic

### Ignoring files

Just like in `standard`, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders (beginning with `.`), and all patterns in a project's root `.gitignore` file are automatically excluded when looking for `.js` files to check.

Sometimes you need to ignore additional folders or specific minfied files. To do that, add a `sagastandard.ignore` property to `package.json`:

```json
"sagastandard": {
  "ignore": [
    "**/out/",
    "/lib/select2/",
    "/lib/ckeditor/",
    "tmp.js"
  ]
}
```

### Make it look `snazzy`
If you want prettier output, just install the [`snazzy`](https://github.com/feross/snazzy) package and pipe `sagastandard` to it:

```bash
$ sagastandard --verbose | snazzy
```

See [feross/standard] for more information.

## Contributing
Code can be contributed through pull-requests. We ask that the following criterias be followed.

### Test
To test run:
```bash
$ npm run test
```

### Style
We will let you guess that one.

### Commit messages
Commit messages must comply with the [kgitb's requirements](https://github.com/Sagacify/komitet-gita-bezopasnosti#commit-message-format).

[feross/standard]: https://github.com/feross/standard
[Flet/semistandard]: https://github.com/Flet/semistandard
