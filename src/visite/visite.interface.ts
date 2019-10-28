import { IGerant } from 'gerant/gerant.interface';

export interface IVisite {
  numero_fiche: string;
  date: string;
  gerant: IGerant;
  visiteurs: string;
}
