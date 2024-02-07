export interface Paiement {
  date: Date;
  toDate: Date;
  professeur: string;
  nbh: number;
  th: number;
  nbc: number;
  totalMontant: number;
  status: string;
  confirmation: string;
}
