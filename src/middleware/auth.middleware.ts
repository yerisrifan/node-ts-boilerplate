import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error | null, user: User | false, _info: unknown) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};
