import { element, by, ElementFinder } from 'protractor';

export class ContractComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contract div table .btn-danger'));
  title = element.all(by.css('jhi-contract div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ContractUpdatePage {
  pageTitle = element(by.id('jhi-contract-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  documentNumberInput = element(by.id('field_documentNumber'));
  enabledInput = element(by.id('field_enabled'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDocumentNumberInput(documentNumber: string): Promise<void> {
    await this.documentNumberInput.sendKeys(documentNumber);
  }

  async getDocumentNumberInput(): Promise<string> {
    return await this.documentNumberInput.getAttribute('value');
  }

  getEnabledInput(): ElementFinder {
    return this.enabledInput;
  }
  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ContractDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contract-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contract'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
