import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContract, Contract } from 'app/shared/model/contract/contract.model';
import { ContractService } from './contract.service';

@Component({
  selector: 'jhi-contract-update',
  templateUrl: './contract-update.component.html'
})
export class ContractUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    documentNumber: [null, [Validators.required, Validators.minLength(1)]],
    enabled: [null, [Validators.required]]
  });

  constructor(protected contractService: ContractService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contract }) => {
      this.updateForm(contract);
    });
  }

  updateForm(contract: IContract): void {
    this.editForm.patchValue({
      id: contract.id,
      documentNumber: contract.documentNumber,
      enabled: contract.enabled
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contract = this.createFromForm();
    if (contract.id !== undefined) {
      this.subscribeToSaveResponse(this.contractService.update(contract));
    } else {
      this.subscribeToSaveResponse(this.contractService.create(contract));
    }
  }

  private createFromForm(): IContract {
    return {
      ...new Contract(),
      id: this.editForm.get(['id'])!.value,
      documentNumber: this.editForm.get(['documentNumber'])!.value,
      enabled: this.editForm.get(['enabled'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContract>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
