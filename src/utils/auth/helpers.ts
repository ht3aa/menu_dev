import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { SimpleError } from "..";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      console.log("err in auth");
      throw new SimpleError(401, "unauthorized");
    }

    if (!info && !user) {
      console.log("err in auth info and user");
      return next(new SimpleError(401, "unauthorized"));
    }

    req.user = user;

    return next();
  })(req, res, next);
};

export const authenticateTolerate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt-tolerant",
    { session: false },
    function (err, user, info) {
      if (user) {
        req.user = user;
      }

      return next();
    }
  )(req, res, next);
};
