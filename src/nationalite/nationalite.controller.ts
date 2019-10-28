import { INationalite } from './nationalite.interface';
import { database } from '../app/app.database';
import { Request, Response } from 'express';
const table = 'nationalites';
const db = database.connect();

class NationaliteController {
  public getList(req: Request, res: Response): void {
    db.query(
      `SELECT * FROM ${table}`,
      (err: any, results: any, fields: any) => {
        if (err) {
          res.status(500).json(err);
        }

        res.status(200).json(results);
      }
    );
  }

  public create(req: Request, res: Response): void {
    db.query(
      `INSERT INTO ${table} SET ?`,
      req.body,
      (error, results, fields) => {
        if (error) {
          res.status(500).json(error);
        }
        res.status(200).json(results);
      }
    );
  }

  public getById(req: Request, res: Response): void {
    db.query(
      `SELECT * FROM ${table} WHERE ID=${req.params.id}`,
      (err: any, results: any, fields: any) => {
        if (err) {
          res.status(500).json(err);
        }

        res.status(200).json(results);
      }
    );
  }

  public async findOne(email: string) {
    let nationalite: INationalite = { code: '', nationalite: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE email="${email}"`,
      (err: any, results: INationalite[], fields: any) => {
        if (err) {
          throw err;
        }

        nationalite = results[0];
      }
    );

    return nationalite;
  }

  public async findById(id: number) {
    let nationalite: INationalite = { code: '', nationalite: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE ID=${id}`,
      (err: any, results: INationalite[], fields: any) => {
        if (err) {
          throw err;
        }

        nationalite = results[0];
      }
    );

    return nationalite;
  }

  public delete(req: Request, res: Response): void {
    db.query(
      `DELETE FROM ${table} WHERE ID = "${req.params.id}"`,
      (error, results, fields) => {
        if (error) {
          res.status(500).json(error);
        }
        res.status(200).json(results);
      }
    );
  }

  public update(req: Request, res: Response): void {
    db.query(`UPDATE ${table} SET ?`, req.body, (error, results, fields) => {
      if (error) {
        res.status(500).json(error);
      }
      res.status(200).json(results);
    });
  }
}

export const nationaliteController = new NationaliteController();
