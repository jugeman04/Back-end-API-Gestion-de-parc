import { IGerant } from './gerant.interface';
import { database } from '../app/app.database';
import { Request, Response } from 'express';
const table = 'gerants';
const db = database.connect();

class GerantController {
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
    let gerant: IGerant = { matricule: 0, nom: '', prenom: '', fonction: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE email="${email}"`,
      (err: any, results: IGerant[], fields: any) => {
        if (err) {
          throw err;
        }

        gerant = results[0];
      }
    );

    return gerant;
  }

  public async findById(id: number) {
    let gerant: IGerant = { matricule: 0, nom: '', prenom: '', fonction: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE ID=${id}`,
      (err: any, results: IGerant[], fields: any) => {
        if (err) {
          throw err;
        }

        gerant = results[0];
      }
    );

    return gerant;
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

export const gerantController = new GerantController();
