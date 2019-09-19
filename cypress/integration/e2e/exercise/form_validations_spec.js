import exercises from '../../../fixtures/exercise-response'
import enums from '../../../fixtures/enum-response'

describe('form validation', () => {
  const needBodyArea = 'Please pick a body area';
  const needFocusArea = 'Please pick at least one focus area';
  const needFeedback = 'Please pick at least one suggested feedback';
  const needRepsToPoints= 'Please use unique numbers for score based of reps or 0, 0, 0, 0, 1 to represent pass fail';
  const needSuggestedWeightWomen = 'Please use unique numbers for suggested weight for women';
  const needSuggestedWeightMen = 'Please use unique numbers for suggested weight for men';

  beforeEach(() => {
    cy.server({
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/listExercises',
      response: {
            exercises,
        }
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/getenumsresponse',
      response: {
            enums,
        }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="exercises"]')
      .click()

    cy.get('[data-test="create-exercise-link"]')
      .click()
  })

  it('wont let you submit without necessary info', () => {
    cy.get('[data-test="exercise-name-input" ]')
      .type('New Exercise')

    cy.get('[data-test="exercise-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .contains(needBodyArea)

    cy.get('[data-test="error-div"]')
      .contains(needFocusArea)

    cy.get('[data-test="error-div"]')
      .contains(needFeedback)

    cy.get('[data-test="error-div"]')
      .contains(needRepsToPoints)
  })

  it('error message disappears after the user fixes the problem', () => {
    cy.get('[data-test="exercise-name-input" ]')
      .type('New Exercise')

    cy.get('[data-test="exercise-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .contains(needBodyArea)

    cy.get('[data-test="body-area-input"]')
      .select('Cardio', {force: true})

    cy.get('[data-test="exercise-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .should('not.contain', needBodyArea)
  })

  it('only shows suggested weight errors if they are shown on the form', () => {
    cy.get('[data-test="exercise-name-input" ]')
      .type('New Exercise')

    cy.get('[data-test="exercise-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .should('not.contain', needSuggestedWeightMen)

    cy.get('[data-test="error-div"]')
      .should('not.contain', needSuggestedWeightWomen)

    cy.get('[data-test="addGenderWeight"]')
      .click()

    cy.get('[data-test="exercise-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .contains(needSuggestedWeightMen)

    cy.get('[data-test="error-div"]')
      .contains(needSuggestedWeightWomen)
  })

  it('allows for "0, 0, 0, 0, 1" to stand in for pass/fail but no other repeating combination', () => {

    cy.get('[data-test="exercise-name-input" ]')
    .type('New Exercise')

    cy.get('[data-test="level1"]')
    .clear()
    .type(1, {force: true})

    cy.get('[data-test="level2"]')
    .clear()
    .type(0, {force: true})

    cy.get('[data-test="level3"]')
    .clear()
    .type(0, {force: true})

    cy.get('[data-test="level4"]')
    .clear()
    .type(0, {force: true})

    cy.get('[data-test="level5"]')
    .clear()
    .type(0, {force: true})

    cy.get('[data-test="exercise-submit-button"]')
      .click()
    cy.get('[data-test="error-div"]')
    .should('contain', needRepsToPoints)

    cy.get('[data-test="level1"]')
    .clear()
    .type(0, {force: true})

    cy.get('[data-test="level5"]')
    .clear()
    .type(1, {force: true})

    cy.get('[data-test="exercise-submit-button"]')
      .click()
      
    cy.get('[data-test="error-div"]')
    .should('not.contain', needRepsToPoints)
  })
})
