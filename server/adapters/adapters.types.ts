import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';

export type NextRequest = NextApiRequest & Request;
export type NextResponse = NextApiResponse & Response;

export interface IAdaptNextRequest {
  req: NextRequest;
  res: NextResponse;
}
