import {Provider} from '@loopback/core';
import {Middleware} from '@loopback/rest';
import {RequestHandler} from 'express';
import {expressjwt, GetVerificationKey} from 'express-jwt';
import jwksRsa from 'jwks-rsa';


export class AuthMiddlewareProvider implements Provider<Middleware> {

  constructor() { }

  value(): Middleware {
    return async (middlewareCtx, next) => {

      if (middlewareCtx.request.path == '/' || middlewareCtx.request.path.startsWith('/explorer')) {
        return next(); // Omitir middleware
      }

      const jwtHandler: RequestHandler = expressjwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 10,
          jwksUri: 'https://dev-p28g3izr2lega4kf.us.auth0.com/.well-known/jwks.json',
        }) as GetVerificationKey,
        audience: 'https://127.0.0.1:3000',
        issuer: 'https://dev-p28g3izr2lega4kf.us.auth0.com/',
        algorithms: ['RS256'],
      });

      return new Promise<any>((resolve, reject) => {
        jwtHandler(middlewareCtx.request, middlewareCtx.response, (err?: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(next());
          }
        });
      });
    }
  }
};
