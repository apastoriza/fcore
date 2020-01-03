import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BankAccountComponentsPage, BankAccountDeleteDialog, BankAccountUpdatePage } from './bank-account.page-object';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankAccountComponentsPage: BankAccountComponentsPage;
  let bankAccountUpdatePage: BankAccountUpdatePage;
  let bankAccountDeleteDialog: BankAccountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BankAccounts', async () => {
    await navBarPage.goToEntity('bank-account');
    bankAccountComponentsPage = new BankAccountComponentsPage();
    await browser.wait(ec.visibilityOf(bankAccountComponentsPage.title), 5000);
    expect(await bankAccountComponentsPage.getTitle()).to.eq('gatewayApp.accountBankAccount.home.title');
  });

  it('should load create BankAccount page', async () => {
    await bankAccountComponentsPage.clickOnCreateButton();
    bankAccountUpdatePage = new BankAccountUpdatePage();
    expect(await bankAccountUpdatePage.getPageTitle()).to.eq('gatewayApp.accountBankAccount.home.createOrEditLabel');
    await bankAccountUpdatePage.cancel();
  });

  it('should create and save BankAccounts', async () => {
    const nbButtonsBeforeCreate = await bankAccountComponentsPage.countDeleteButtons();

    await bankAccountComponentsPage.clickOnCreateButton();
    await promise.all([bankAccountUpdatePage.setNumberInput('number')]);
    expect(await bankAccountUpdatePage.getNumberInput()).to.eq('number', 'Expected Number value to be equals to number');
    const selectedEnabled = bankAccountUpdatePage.getEnabledInput();
    if (await selectedEnabled.isSelected()) {
      await bankAccountUpdatePage.getEnabledInput().click();
      expect(await bankAccountUpdatePage.getEnabledInput().isSelected(), 'Expected enabled not to be selected').to.be.false;
    } else {
      await bankAccountUpdatePage.getEnabledInput().click();
      expect(await bankAccountUpdatePage.getEnabledInput().isSelected(), 'Expected enabled to be selected').to.be.true;
    }
    await bankAccountUpdatePage.save();
    expect(await bankAccountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BankAccount', async () => {
    const nbButtonsBeforeDelete = await bankAccountComponentsPage.countDeleteButtons();
    await bankAccountComponentsPage.clickOnLastDeleteButton();

    bankAccountDeleteDialog = new BankAccountDeleteDialog();
    expect(await bankAccountDeleteDialog.getDialogTitle()).to.eq('gatewayApp.accountBankAccount.delete.question');
    await bankAccountDeleteDialog.clickOnConfirmButton();

    expect(await bankAccountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
