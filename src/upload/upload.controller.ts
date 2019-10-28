import { Request, Response } from 'express';

class UploadController {
  public add(req: Request, res: Response): void {
    res.status(200).json({ message: 'success' });
  }
}

export const uploadController = new UploadController();
