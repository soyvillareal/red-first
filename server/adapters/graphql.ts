import { NextApiRequest, NextApiResponse } from 'next';

import { IAdaptNextRequest, NextRequest, NextResponse } from './adapters.types';

export const adaptNextRequest = (
  req: NextApiRequest,
  res: NextApiResponse,
): IAdaptNextRequest => {
  const newRequest = {
    get: (header: string) => req.headers[header.toLowerCase()],
    header: (header: string) => req.headers[header.toLowerCase()],
    accepts: () => true,
    acceptsCharsets: () => true,
    acceptsEncodings: () => true,
    acceptsLanguages: () => true,
    range: () => true,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    app: {
      get: (key: string) => {
        if (key === 'trust proxy') {
          return true;
        }
        return false;
      },
    },
    ...req,
  };

  Object.assign(req, newRequest);

  return {
    req: req as NextRequest,
    res: res as NextResponse,
  };
};
