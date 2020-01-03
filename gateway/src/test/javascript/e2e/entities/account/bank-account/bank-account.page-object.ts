import { element, by, ElementFinder } from 'protractor';

export class BankAccountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bank-account div table .btn-danger'));
  title = element.all(by.css('jhi-bank-account div h2#page-heading span')).first();

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

export class BankAccountUpdatePage {
  pageTitle = element(by.id('jhi-bank-account-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numberInput = element(by.id('field_number'));
  enabledInput = element(by.id('field_enabled'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumberInput(number: string): Promise<void> {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput(): Promise<string> {
    return await this.numberInput.getAttribute('value');
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

export class BankAccountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bankAccount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bankAccount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
