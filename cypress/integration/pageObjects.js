import {navigateTo} from "../support/page-objects/navigationPage";
import {formLayoutsPage} from "../support/page-objects/formLayoutsPage";
import {datepickerPage} from "../support/page-objects/datepickerPage";
import {smartTablePage} from "../support/page-objects/smartTablePage";

describe('Test with page objects', function () {
  beforeEach('open application', () => {
    cy.openHomePage()
  })

  it('should verify navigations across the pages', function () {
    navigateTo.formLayoutsPage()
    navigateTo.datePickerPage()
    navigateTo.toasterPage()
    navigateTo.smartTablePage()
    navigateTo.tooltipPage()
  });

  it('should submit Inline and Basic form and select tomorrow date in the calendar', function () {
    //navigateTo.formLayoutsPage()
    //formLayoutsPage.submitInlineFormWithNameAndEmail('Artem','test@test.com')
    //formLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com','password')
    //navigateTo.datePickerPage()
    //datepickerPage.selectCommonDatepickerFromToday(1)
    //datepickerPage.selectDatepickerWithRangeFromToday(7,14)
    navigateTo.smartTablePage()
    smartTablePage.addNewRecordWithFirstAndLastName('Artem','Bondar')
    smartTablePage.updateAgeByFirstName('Artem', 55)
    smartTablePage.deleteRowByIndex(1)
  });
});
