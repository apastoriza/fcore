import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ContractComponent } from './contract.component';
import { ContractDetailComponent } from './contract-detail.component';
import { ContractUpdateComponent } from './contract-update.component';
import { ContractDeleteDialogComponent } from './contract-delete-dialog.component';
import { contractRoute } from './contract.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(contractRoute)],
  declarations: [ContractComponent, ContractDetailComponent, ContractUpdateComponent, ContractDeleteDialogComponent],
  entryComponents: [ContractDeleteDialogComponent]
})
export class ContractContractModule {}
