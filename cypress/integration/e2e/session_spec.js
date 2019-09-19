import sessions from '../../fixtures/session-response.js'
import exercises from '../../fixtures/exercise-response.js'
let today = new Date();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();
months.forEach((month, i) => {
  if(i === mm){
    mm = month
  }
})
/* will return format: "5 June, 2018", to be used in date-picker*/
today = dd + ' ' + mm + ', ' + yyyy;

describe('login to view sessions', () => {
  let sessionPageCopy = 'Choose a Session Location';

  it('wont let you see sessions unless you are logged in', () => {
    cy.visit("http://localhost:3000/sessions");
    cy.get('[data-test="need-to-login"]')
      .contains('Please log in');
    cy.should('not.contain', sessionPageCopy);
  });

  it('will let you see sessions when you are logged in', () => {
    cy.server({
      status: 200
    });

    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/getSessions',
      response: {
        sessions,
      }
    });
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/listExercises',
      response: {
            exercises,
        }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="sessions"]')
      .click();
    cy.get('body')
      .contains(sessionPageCopy)
  });
});


describe('The sessions page UI components', () => {
  it('A user can enter a date', () => {
    cy.get("[data-test='date-picker']")
      .click()
    cy.get('[aria-label="' + today + '"]')
      .click()
    cy.get('.picker__close')
      .click();
    cy.get("[data-test='date-picker']")
    cy.should('not.contain', 'Select date');
  });

  it('A user can check a location checkbox', () => {
    cy.get("#input_0")
      .click({force:true})
      .should('be.checked')
    cy.get("#input_1")
      .click({force:true})
      .should('be.checked')
    cy.get("#input_2")
      .click({force:true})
      .should('be.checked')
  });

  it('A user can check the "Return Full Week" checkbox', () => {
    cy.get("#input_4")
      .click({force:true})
      .should('be.checked')
  })
});

describe('The sessions page rendering logic', () => {
  beforeEach(() => {
    cy.server({
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'URL-hidden/v1/getSessions',
      response: {
        sessions,
      },
    });
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/listExercises',
      response: {
            exercises,
        }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

      cy.get('[data-test="sessions"]')
    .click();
  })

  it('If a user does not enter a date, display that they must', () => {
    cy.get("#input_0")
      .click({force:true})
    cy.get("[data-test='submit_button']")
      .click()
    cy.get("[data-test='rendered_logic']")
      .contains('No Sessions')
  });

  it('If a user does not enter a location, display that they must', () => {
    cy.get("[data-test='date-picker']")
      .click()
    cy.get('[aria-label="' + today + '"]')
      .click()
    cy.get('.picker__close')
      .click();
    cy.get("[data-test='submit_button']")
      .click()
    cy.get("[data-test='rendered_logic']")
      .contains('Please select a location to search')
  });

  it('submit button requests the specified sessions', () => {
    cy.get("#input_0")
      .click({force:true})
    cy.get("[data-test='date-picker']")
      .click()
    cy.get('[aria-label="' + today + '"]')
      .click()
    cy.get('.picker__close')
      .click();
    cy.get("[data-test='submit_button']")
      .click({force:true})
    cy.get(".card").children().should('have.class', 'card-content')
  });

  it('The session cards are clickable', () => {
    cy.get("#input_0")
      .click({force:true})
    cy.get("[data-test='date-picker']")
      .click()
    cy.get('[aria-label="' + today + '"]')
      .click()
    cy.get('.picker__close')
      .click();
    cy.get("[data-test='submit_button']")
      .click({force:true})
    cy.get(".card")
      .first()
      .click()
    cy.get('[data-test="session-card"]')
      .contains('Session Id:')
  });

  it('If multiple locations are checked, cards and rendered with corresponding locations', () => {
    cy.get("#input_0")
      .click({force:true})
    cy.get("#input_2")
      .click({force:true})
    cy.get("[data-test='date-picker']")
      .click()
    cy.get('[aria-label="' + today + '"]')
      .click()
    cy.get('.picker__close')
      .click();
    cy.get("[data-test='submit_button']")
      .click({force:true})
    cy.get(".card")
      .contains('NEW_YORK')
    cy.get(".card")
      .contains('TEST_LOCATION')
  });
});
