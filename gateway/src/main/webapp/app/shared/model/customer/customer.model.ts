export interface ICustomer {
  id?: number;
  name?: string;
  legalId?: string;
  enabled?: boolean;
  userLogin?: string;
  userId?: number;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public legalId?: string,
    public enabled?: boolean,
    public userLogin?: string,
    public userId?: number
  ) {
    this.enabled = this.enabled || false;
  }
}
