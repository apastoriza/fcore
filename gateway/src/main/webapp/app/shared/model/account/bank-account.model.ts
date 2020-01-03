export interface IBankAccount {
  id?: number;
  number?: string;
  enabled?: boolean;
}

export class BankAccount implements IBankAccount {
  constructor(public id?: number, public number?: string, public enabled?: boolean) {
    this.enabled = this.enabled || false;
  }
}
