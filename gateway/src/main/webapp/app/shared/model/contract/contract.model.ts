export interface IContract {
  id?: number;
  documentNumber?: string;
  enabled?: boolean;
}

export class Contract implements IContract {
  constructor(public id?: number, public documentNumber?: string, public enabled?: boolean) {
    this.enabled = this.enabled || false;
  }
}
