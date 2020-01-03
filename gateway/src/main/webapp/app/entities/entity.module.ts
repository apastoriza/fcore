import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer/customer.module').then(m => m.CustomerCustomerModule)
      },
      {
        path: 'bank-account',
        loadChildren: () => import('./account/bank-account/bank-account.module').then(m => m.AccountBankAccountModule)
      },
      {
        path: 'contract',
        loadChildren: () => import('./contract/contract/contract.module').then(m => m.ContractContractModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
