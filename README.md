koa-x-signature
=========

[![NPM version](https://img.shields.io/npm/v/koa-huiji-signature.svg)](https://npmjs.org/package/koa-x-signature)
[![node version](https://img.shields.io/badge/node.js-%3E=_7.6-green.svg)](https://nodejs.org/en/download/)

X-Hub-Signature Koa Middleware.

## Install

[![NPM](https://nodei.co/npm/koa-huiji-signature.png?downloads=true)](https://nodei.co/npm/koa-huiji-signature/)

## Usage

Add the middleware to Koa. It needs to be *after* `bodyParser()`.

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const HUIJI = require('koa-x-signature');

const app = new Koa();
app.use(bodyParser());
app.use(HUIJI({algorithm: 'sha1', secret: HUIJI_SECRET_HERE}));
```

Where `HUIJI_SECRET_HERE` is your platform's (facebook, github, etc) secret.

This will add some special sauce to your `ctx.request` object:

### hasSig ```boolean```

Is the request from Huiji. Allows you to early reject any messages without HUIJI content.

```js
if (!ctx.request.hasSig) { ctx.throw(403, 'No X-Signature'); }
```

### isValid ```ctx.request.isValid()```

Returns a boolean value. Validates the request body against the HUIJI signature using your secret.

```js
if (!ctx.request.isValid || !ctx.request.isValid()) { ctx.throw(403, 'Invalid Request Signature'); }
```

If it's valid, then the request has not been tampered with and you are safe to process it.

## Options

* **secret**: Huiji secret that is used to validate the request body against the signed X-HUB signature on the header. **Required.**
* **algorithm**: Encryption algorithm used to generate the signature. Default is `sha1`.

## License

[MIT](LICENSE)

## Acknowledgements

This project is inspired by [express-x-hub](https://github.com/alexcurtis/express-x-hub).