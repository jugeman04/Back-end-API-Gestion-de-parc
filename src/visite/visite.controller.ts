import { IVisite } from './visite.interface';
import { database } from '../app/app.database';
import { Request, Response } from 'express';
import { gerantController } from '../gerant/gerant.controller';
const table = 'visites';
const db = database.connect();

class VisiteController {
  public getList(req: Request, res: Response): void {
    db.query(
      `SELECT * FROM ${table}`,
      (err: any, results: any, fields: any) => {
        if (err) {
          res.status(500).json(err);
        }

        var resultats = [];

        results.map((result: any) => {
          gerantController.findById(result.matricule_gerant).then(gerant => {});
        });
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

  // public async findOne(email: string) {
  //   // let visite: IVisite = { numero_fiche: '', date: '', gerant: new IGerant, visitename: '' };
  //   await db.query(
  //     `SELECT * FROM ${table} WHERE email="${email}"`,
  //     (err: any, results: IVisite[], fields: any) => {
  //       if (err) {
  //         throw err;
  //       }

  //       // visite = results[0];
  //     }
  //   );

  //   return visite;
  // }

  // public async findById(id: number) {
  //   let visite: IVisite = { id: 0, email: '', password: '', visitename: '' };
  //   await db.query(
  //     `SELECT * FROM ${table} WHERE ID=${id}`,
  //     (err: any, results: IVisite[], fields: any) => {
  //       if (err) {
  //         throw err;
  //       }

  //       visite = results[0];
  //     }
  //   );

  //   return visite;
  // }

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

export const visiteController = new VisiteController();
