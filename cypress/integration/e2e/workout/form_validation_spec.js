import items from '../../../fixtures/workout-response'
import exercises from '../../../fixtures/exercise-response'

describe('Validations for workout form', () => {
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
      method: 'PUT',
      url: 'URL-hidden/v1/addWorkout',
      response: {
        status: {
          error: false
        }
      }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="workoutbuilder"]')
      .click({force: true})
  })

  it('wont let you submit without a workout', () => {
    cy.get('[data-test="workout-name"]')
      .type('New Workout')

    cy.get('[data-test="workout-submit-button"]')
      .click()

    cy.get('[data-test="error-div"]')
      .should('contain', 'You must chose at least one exercise')
  })
})
