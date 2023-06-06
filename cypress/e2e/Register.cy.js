import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/pt_BR';
import {registerLocator} from '../support/locators/registerLocator';

describe('Register', () => {
  it('Valid Data', () => {
    cy.visit('/Register.html');

    cy.get(registerLocator.FIRST_NAME).type(faker.person.firstName());
    cy.get(registerLocator.LAST_NAME).type(faker.person.lastName());
    cy.get(registerLocator.ADDRESS).type(faker.location.street());
    cy.get(registerLocator.EMAIL_ADDRESS).type(faker.internet.email());
    cy.get(registerLocator.PHONE).type(faker.phone.imei());
    cy.get(registerLocator.FNC_GENDER_RADIO(faker.person.sex())).click();
    cy.contains(registerLocator.TEXT_LABEL_HOBBIES).next().children().each(($div) => {
      //TODO: ADICIONAR CONDICIONAL PARA SELECIONAR APENAS 1 HOBBIE
      $div.children().first().click();
    });
  });
});