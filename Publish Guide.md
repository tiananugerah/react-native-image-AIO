# Publishing the library

`react-native-image-aio` is published to public npm. Follow this step to publish.

## Login to your npm
```sh
npm adduser --access public
```

Folow the prompt to login

## Build the library
```sh
yarn prepack
```

## Publish to public NPM

```sh
npm publish --access public
```

That's it, congrats 🥳🥳

## Some notes for publishing
```sh
npm version --preid canary preminor # go from 1.1.0 to 1.2.0-canary.0

npm version --preid canary prerelease # go from 1.2.0-canary.0 to 1.2.0-canary.1

npm publish --tag canary # publish your-pkg@1.2.0-canary.1
```