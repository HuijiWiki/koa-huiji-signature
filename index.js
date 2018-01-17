/**!
 * koa-x-hub - index.js
 * Copyright 2018 Mudkip.Me
 * MIT Licensed
 */

'use strict';

const crypto = require('crypto');

/**
 * X-Hub-Signature Koa Middleware
 * @param {Object} [opts] 
 * @param {string} [opts.algorithm="sha1"]
 * @param {string} [opts.secret]
 */

module.exports = function (opts) {    
  const algorithm = opts.algorithm || 'sha1';
  const secret = opts.secret;

  function isValid(raw, sig) {
    if (!secret) {
      throw new Error('No Secret Found');
    }
    if (!raw) {
      return false;
    }
    const hmac = crypto.createHmac(algorithm, secret);
    hmac.update(raw, 'utf-8');
    const expected = `${algorithm}=${hmac.digest('hex')}`;
    return expected === sig;
  }

  return async (ctx, next) => {
    ctx.request.hasSig = false;

    const sig = ctx.request.get('X-Signature');
    const wiki = ctx.request.get('X-Wiki');

    if (!sig || !wiki) {
      return await next();
    }

    ctx.request.hasSig = true;
    ctx.request.wiki = wiki;
    ctx.request.isHuijiRequest = () => isValid(ctx.request.rawBody, sig);
    await next();
  }
}