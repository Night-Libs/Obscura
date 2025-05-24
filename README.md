# Obscura

Obscura is a JavaScript library written in TypeScript allowing you to encode and decode strings into UUIDs. Obscura is designed to be simple and easy to use, while also being powerful and flexible.
Obscura is not a cryptographic library, and should not be used for security purposes. It is designed for obfuscation and encoding, not encryption. The decryption key necessary to decode a UUID back to its original form is included in localStorage for now. This may change in the future, but the decryption key must be stored somewhere as a UUID is non-reversible.

> [!CAUTION]
> Do not attempt to use Obscura for security purposes. It is not designed for that, and will not work as expected. Obscura is designed for obfuscation and encoding, not encryption. Do not use Obscura to store sensitive information, as it is not secure.

# Installation

> [!TIP]
> It might be easier to use Obscura with a bundler, such as Vite, Webpack, or Parcel. This will allow you to use Obscura in a browser environment without having to worry about the complexities of bundling and transpiling your code. If you are using a bundler, you can simply import Obscura as a module and use it in your code.

## Bundler

All you need to do to use Obscura in a bundler environment is to install it via npm or yarn, and then import it into your code.

```javascript
import { Obscura } from "@nightnetwork/obscura";
```

## Static

To use Obscura in a static environment, you'll need to clone the Obscura git repo.

Open your terminal.

Start by cloning the repo:

```bash
git clone https://github.com/Night-Libs/Obscura.git
```

Then, change your current working directory to be the newly created directory `Obscura` (this might change based on the config you provided the clone command)

```bash
cd Obscura
```

Next, install `bun` for your machine if you haven't already. You can find the installation instructions on [Bun's official website](https://bun.sh).
If you have just freshly installed bun, restart your terminal and renavigate to the Obscura folder.

Next, install the dependencies required by Obscura by running:

```bash
bun i
```

After that, build Obscura by running:

```bash
bun run build
```

You'll find a `dist` folder in the Obscura directory, which contains the built files.

You can now use Obscura in your static environment by including the `obscura.js` file in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Obscura Example</title>
    <script src="path/to/obscura.js"></script>
  </head>
  <body></body>
</html>
```

> [!IMPORTANT]  
> Remember to build Obscura before using it in a browser environment without a bundler. You can do this by running `bun run build` in the root directory. This will create a `dist` folder with the built files. Copy the `obscura.js` file from the `dist` folder to your project and include it in your HTML file.

# Usage

In this section, we are assuming we are using a bundler. The instructions are the same for initializing Obscura in a static environment, but you will need to include the `obscura.js` file in your HTML file as described above.

Firstly, we need to create an instance of Obscura.

Obscura requires a `passphrase` to be passed in the constructor.
You can use your own, or generate a random one using `Obscura.genPassphrase(8)`. You may replace `8` with any number you want, but it is recommended to use a length greater than or equal to `8` for security purposes. The number is the character length of your passphrase.

Obscura uses ESM syntax. Keep that in mind when importing it without a bundler.

The below examples assume you are importing Obscura as `Obscura`, and not a custom name.

Now that we have our passphrase, we need to initialize the Obscura class.

```javascript
// assumes passphrase is a variable containing either your generated passphrase or your custom one
const obscura = new Obscura(passphrase);
```

> [!IMPORTANT]
> The following step is prone to change; please check the Obscura documentation in case the following method changes in a future update.

Next, we need to initialize core values needed for Obscura to work. In this version of Obscura (v1.0.0), we can just do:

```javascript
// assumes obscura is the instance of Obscura we created earlier
await obscura.init();
```

> [!WARNING]
> All of Obscura's methods are asynchronous, so you will need to use `await` when calling them. If you are not using `await`, you will need to use `.then()` to handle the promise returned by the method.

Finally, we can use the .encode and .decode methods to encode and decode strings into UUIDs like so:

```javascript
// assmues input is a string containing the string we want to encode and uuid is the string containing the uuid we want to decode.
const uuid = await obscura.encode(input);
const decoded = await obscura.decode(uuid);
```

Available as @nightnetwork/obscura on npm.

To build Obscura, bun is recommended, but you can also use npm or yarn if you prefer.

To **test** obscura, using the `tests` folder, bun is required.

Follow the installation steps for your machine to install Bun at [their official website.](https://bun.sh)

Once installed, restart your terminal.

# Testing

This is very important!
Make sure to follow all steps to properly test Obscura.

There are two ways to test Obscura:
In a terminal/node environment, and a browser environment.

To test Obscura in a terminal/node environment, you may run the `test.ts` file in the `tests` folder using `bun tests/test.ts --watch`. Any changes made to the testing file will automatically be reflected in the terminal.

To test Obscura in a browser environment, the steps are extremely different.

> [!IMPORTANT]
> This is assuming we have not published Obscura to npm yet, and are using the local version of Obscura. If you have published Obscura to npm, you can skip the first few steps and just install it via npm.

First, build Obscura by running `bun run build` in the root directory.
Next, run `npm pack` to pack the Obscura library.
After that, run `cd tests/templates` to change directory to our browser testing environement.
Next, run `bun i ../../nightnetwork-obscura-1.0.0.tgz` to install the Obscura library locally. (If the file name is different, change it accordingly.)
Then, in the `tests/templates` directory, run `bun run build`.
Finally, run `bun test_server.ts --watch` to start the testing server to serve the web version.

I have not yet added a testing environment without a bundler and using Obscura as a `.js` file that you can link, but feel free to do that for me if you wish to test that out as well.
