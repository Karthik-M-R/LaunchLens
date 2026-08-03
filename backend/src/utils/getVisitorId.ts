import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export const getVisitorId = (
  req: Request,
  res: Response
) => {
  let visitorId =
    req.cookies?.ll_visitor;

  if (!visitorId) {
    visitorId = uuid();

    res.cookie(
      "ll_visitor",
      visitorId,
      {
        httpOnly: true,
        sameSite: "lax",
        maxAge:
          1000 * 60 * 60 * 24 * 365,
      }
    );
  }

  return visitorId;
};

//drawback
/*One subtle but important point

Our current visitor cookie identifies a browser, not a human.

If I:

click the link in Chrome → one visitor ID.
click the same link in Firefox → a different visitor ID.
clear browser cookies → a new visitor ID.

That's normal behavior and is how many analytics systems work. 
More advanced platforms combine multiple signals (cookies, fingerprints, authenticated users, etc.) to improve accuracy, but for LaunchLens's MVP,
 a persistent browser cookie is the right balance of simplicity and usefulness. */