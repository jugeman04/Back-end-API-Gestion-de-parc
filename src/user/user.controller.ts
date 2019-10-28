import { IUser } from './user.interface';
import { database } from '../app/app.database';
import { Request, Response } from 'express';
import { userService } from './user.service';
const table = 'users';
const db = database.connect();

class UserController {
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
    let user: IUser = { id: 0, email: '', password: '', username: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE email="${email}"`,
      (err: any, results: IUser[], fields: any) => {
        if (err) {
          throw err;
        }

        user = results[0];
      }
    );

    return user;
  }

  public async findById(id: number) {
    let user: IUser = { id: 0, email: '', password: '', username: '' };
    await db.query(
      `SELECT * FROM ${table} WHERE ID=${id}`,
      (err: any, results: IUser[], fields: any) => {
        if (err) {
          throw err;
        }

        user = results[0];
      }
    );

    return user;
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

  public sendMailInscription(req: Request, res: Response): void {
    userService
      .sendMailInscription(req.body)
      .then((response: any) => res.status(200).json(response))
      .catch((err: any) => res.status(500).json(err));
  }
}

export const userController = new UserController();
