import exercises from '../../fixtures/exercise-response'
describe('The login proccess', () => {
  beforeEach(() => {
    cy.server({
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/listExercises',
      response: {
            exercises,
        }
    })

    cy.visit("http://localhost:3000/login?test=1");
  })
  it('Should have a login button', () => {
    cy.get('button')
      .contains('Login')
  })
  it('After login the admin is shown', () => {
    cy.get('button')
      .click()
    cy.get('[data-test="admin-name"]')
      .contains('Robby Dore')
  })
});

describe('loading view', () => {
  beforeEach(() => {
    cy.server({
      status: 200
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()
  })
  it('will have a loading screen', () => {
    cy.get('[data-test="loading-everything"]')
      .contains('Thanks for your patience while everything loads')
  })
})
