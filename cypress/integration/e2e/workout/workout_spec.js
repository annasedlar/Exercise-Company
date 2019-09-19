import items from '../../../fixtures/workout-response'
import exercises from '../../../fixtures/exercise-response'

describe('login to view workouts', () => {
  let firstWorkoutName = 'S1D14 - TRX, KB, Rope';

  it('wont let you see workouts unless you are logged in', () => {
    cy.visit("http://localhost:3000/workouts");
    cy.get('[data-test="need-to-login"]')
      .contains('Please login!');
    cy.should('not.contain', firstWorkoutName);
  });

  it('will let you see workouts when you are logged in', () => {
    cy.server({
      status: 200
    });
        cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/listExercises',
      response: {
            exercises,
        }
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/workoutcollection',
      response: {
        items,
      }
    });

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="workouts"]')
      .click();

    cy.contains(firstWorkoutName);
  });
});


describe('The workout page', () => {
  let firstWorkoutName = 'S1D14 - TRX, KB, Rope';

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

  it('Lists exercises in workout within a modal', () => {
    cy.contains(firstWorkoutName)
      .click();
    cy.get('[data-test="workout-card"]')
      .contains('ol');
  });

  it('Shows a list of equipment needed', () => {
    cy.contains(firstWorkoutName)
      .click({force: true});
    cy.get('.modal-content')
      .should('contain', 'Equipment Needed')
      .should('contain', 'BIKE')
      .should('contain', 'CONES')
  })


  it('dates from the server are displayed', () => {
    cy.contains(firstWorkoutName)
    .click({force:true});
    cy.get('[data-test="assign-dates"]')
      .click()
    cy.contains(firstWorkoutName)
      .click({force:true});
    cy.get('[data-test="date-list"]')
      .contains('06-18')
  })

  it('Click Assign To Dates Button to open date picker and pick a date', () => {
    cy.get('[data-test="date-picker-modal"]')
      .click({multiple:true, force:true})
    cy.get('[aria-label="' + today + '"]')
      .click({force:true, multiple:true})
    cy.get('.picker__close')
      .click({force:true, multiple:true})
  });

  it('Modal closes on click of close button', () => {
    // Cypress.$() is an alt to cy.get when elements in the DOM are being covered/not within scroll and therefore unclickable with cy.get. See: https://github.com/cypress-io/cypress/issues/537 or https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Scrolling
    Cypress.$('.modal-footer .modal-close').click();
    cy.get('[data-test="workouts"]')
      .should('not.contain', 'ol');
  });
});
