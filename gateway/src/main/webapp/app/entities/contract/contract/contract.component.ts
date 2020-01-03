import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContract } from 'app/shared/model/contract/contract.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ContractService } from './contract.service';
import { ContractDeleteDialogComponent } from './contract-delete-dialog.component';

@Component({
  selector: 'jhi-contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent implements OnInit, OnDestroy {
  contracts: IContract[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected contractService: ContractService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.contracts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.contractService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IContract[]>) => this.paginateContracts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.contracts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContracts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContract): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContracts(): void {
    this.eventSubscriber = this.eventManager.subscribe('contractListModification', () => this.reset());
  }

  delete(contract: IContract): void {
    const modalRef = this.modalService.open(ContractDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contract = contract;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateContracts(data: IContract[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.contracts.push(data[i]);
      }
    }
  }
}
