describe("Our first suite", () => {

  it('should do first test', function () {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // by tag name
    cy.get('input')

    // by ID
    cy.get('#inputEmail')

    // by class name
    cy.get('.input-full-width')

    // by attribute name
    cy.get('[placeholder]')

    // by attribute name and value
    cy.get('[placeholder="Email"]')

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    // by tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

    // the most recommended way by cypress
    cy.get('[data-cy="imputEmail1"]').invoke('text')
  });


  it('should do second test', function () {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()


    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in')

    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      //.invoke('text')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  });

  it('should do then and wrap methods', function () {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    /*
    cy.contains('nb-card','Using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain','Email')

    cy.contains('nb-card','Using the Grid')
      .find('[for="inputPassword2"]')
      .should('contain','Password')

    cy.contains('nb-card','Basic form')
      .find('[for="exampleInputEmail1"]')
      .should('contain','Email address')

    cy.contains('nb-card','Basic form')
      .find('[for="exampleInputPassword1"]')
      .should('contain','Password')
    */

    // selenium
    // [..]

    // cypress
    cy.contains('nb-card', 'Using the Grid')
      .then(firstForm => {

        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card', 'Basic form').then(secondForm => {

          // JQuery style
          const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
          expect(passwordLabelFirst).to.equal(passwordLabelSecond)

          // cypress style
          cy.wrap(secondForm)
            .find('[for="exampleInputPassword1"]')
            .invoke('text')
            .should('equal', passwordLabelFirst)
        })
      })
  });

  it('should invoke command', function () {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // 1
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')

    // 2
    cy.get('[for="exampleInputEmail1"]')
      .then(label => {
        expect(label.text()).to.equal('Email address')
      })

    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then(text => {
        expect(text).to.equal('Email address')
      })

    // 4
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .should('equal', 'Email address')

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')
  });

  it('should assert property', function () {


    function selectDayFromCurrent(day) {

      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleDateString('default', {month: 'short'})
      let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then(dateAttribute => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]')
              .click()

            /*cy.get('nb-calendar-day-picker')
              .contains(futureDay)
              .click()
             */

            selectDayFromCurrent(day)

          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click()
          }
        })

      return dateAssert
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        const dateAssert = selectDayFromCurrent(10)

        //cy.wrap(input).invoke('prop','value')
        cy.wrap(input)
          .invoke('val')
          .should('equal', dateAssert)
      })
  });

  it('should select radio button', function () {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then(radioButtons => {
        cy.wrap(radioButtons)
          .first()
          .check({force: true})

        cy.wrap(radioButtons)
          .eq(2)
          .check({force: true})

        cy.wrap(radioButtons)
          .first()
          .should('not.be.checked')

        cy.wrap(radioButtons)
          .eq(2)
          .should('be.disabled')
      })
  });

  it('should check boxes', function () {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]')
      .check({force: true})

    cy.get('[type="checkbox"]')
      .first()
      .click({force: true})

    cy.get('[type="checkbox"]')
      .first()
      .check({force: true})
  });

  it('should list and dropdowns', function () {

    cy.visit('/')

    // 1
    /*
    cy.get('nav nb-select')
      .click()

    cy.get('.options-list')
      .contains('Dark')
      .click()

    cy.get('nav nb-select')
      .should('contain','Dark')

    cy.get('nb-layout-header nav')
      .should('have.css','background-color','rgb(34, 43, 69)')

    */

    // 2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()

      cy.get('.options-list nb-option')
        .each((item, index) => {

          const itemText = item.text().trim()
          const colors = {
            "Light": 'rgb(255, 255, 255)',
            "Dark": 'rgb(34, 43, 69)',
            "Cosmic": 'rgb(50, 50, 89)',
            "Corporate": 'rgb(255, 255, 255)'
          }

          cy.wrap(item).click()

          cy.wrap(dropdown)
            .should('contain', itemText)

          cy.get('nb-layout-header nav')
            .should('have.css', 'background-color', colors[itemText])

          if (index < 3) {
            cy.wrap(dropdown).click()
          }
        })
    })

  });

  it('should Web tables', function () {
    cy.visit('/')
    cy.contains("Tables & Data").click()
    cy.contains("Smart Table").click()

    // 1
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then(tableRow => {

        cy.wrap(tableRow)
          .find('.nb-edit')
          .click()

        cy.wrap(tableRow)
          .find('[placeholder="Age"]')
          .clear()
          .type('25')

        cy.wrap(tableRow)
          .find('.nb-checkmark')
          .click()

        cy.wrap(tableRow)
          .find('td')
          .eq(6)
          .should('contain', '25')
      })

    // 2
    cy.get('thead')
      .find('.nb-plus')
      .click()

    cy.get('thead')
      .find('tr')
      .eq(2)
      .then(tableRow => {
        cy.wrap(tableRow)
          .find('[placeholder="First Name"]')
          .type('Artem')

        cy.wrap(tableRow)
          .find('[placeholder="Last Name"]')
          .type('Bondar')

        cy.wrap(tableRow)
          .find('.nb-checkmark')
          .click()
      })

    cy.get('tbody tr')
      .first()
      .find('td')
      .then(tableColumns => {
        cy.wrap(tableColumns)
          .eq(2)
          .should('contain', 'Artem')

        cy.wrap(tableColumns)
          .eq(3)
          .should('contain', 'Bondar')
      })

    // 3
    const ages = [20, 30, 40, 200]

    cy.wrap(ages).each(age => {

      cy.get('thead [placeholder="Age"]')
        .clear()
        .type(age)

      cy.wait(500)

      cy.get('tbody tr')
        .each(tableRow => {
          if (age == 200) {
            cy.wrap(tableRow)
              .should('contain', 'No data found')
            return
          }

          cy.wrap(tableRow)
            .find('td')
            .eq(6)
            .should('contain', age)
        })
    })

  });

  // tooltip issue
  it('should tooltip', function () {
    cy.visit('/')
    cy.contains("Modal & Overlays").click()
    cy.contains("Tooltip").click()

    cy.contains('nb-card','Colored Tooltips')
      .contains('Default').click()

    cy.get('nb-tooltip').should('contain','This is a tooltip')
  });

  it.only('should dialog box', function () {
    cy.visit('/')
    cy.contains("Tables & Data").click()
    cy.contains("Smart Table").click()

    // 1
    cy.get('tbody tr')
      .first()
      .find('.nb-trash')
      .click()

    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    // 2
    const stub = cy.stub();
    cy.on('window:confirm', stub)
    cy.get('tbody tr')
      .first()
      .find('.nb-trash')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      })

    // 3
    cy.get('tbody tr')
      .first()
      .find('.nb-trash')
      .click()
    cy.on('window:confirm', () => false)
  });
})
