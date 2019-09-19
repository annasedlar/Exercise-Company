import items from '../../../fixtures/workout-response'
import exercises from '../../../fixtures/exercise-response'

describe('Workout modal has a link to edit the current workout', () => {
  let { name } = items[0]
  beforeEach(() => {
    cy.server({
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/workoutcollection',
      response: {
        items,
      }
    })
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

    cy.get('[data-test="workouts"]')
      .click()
  })

  it('has a working link and sets the current workout', () => {
    cy.get('[data-test="edit-workout"]')
      .first()
      .contains('Edit Workout')
      .click({force: true})

    cy.url().should('include', '/workout/edit')
    cy.get('[data-test="workout-name"]')
      .should('have.value', name)
  })
});

describe('Editing a workout', () => {
  let { exerciseDescriptions } = items[0]
  const newExerciseName = "Updated workout"
  const firstExercise = `1. ${exerciseDescriptions[0].name}`
  beforeEach(() => {
    cy.server({
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'URL-hidden/v1/workoutcollection',
      response: {
        items,
      }
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
      url: 'URL-hidden/v1/modifyWorkout',
      response: {
        status: {
          error: false
        }
      }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="workouts"]')
      .click()

    cy.get('[data-test="edit-workout"]')
      .first()
      .click({force: true})
  })

  it('has workouts in both lists', () => {
    cy.get('[data-test="all-exercises"]')
      .should('have.length', 4)

    cy.get('[data-test="workout-exercises"]')
      .should('have.length', exerciseDescriptions.length)
  })

  it('updates the workout', () => {
    cy.get('[data-test="workout-name"]')
      .clear()
      .type(newExerciseName)

    cy.get('[data-test="workout-submit-button"]')
      .click()

    cy.get('[data-test="workout-name"]')
      .should('have.value', newExerciseName)
  })

  it('shows which number the workout is', () => {
    cy.get('[data-test="workout-exercises"]')
      .first()
      .contains(firstExercise)
  })

  it('gives success alert', () => {
    cy.get('[data-test="workout-submit-button"]')
      .click()

    cy.get('.s-alert-success')
      .should('contain', 'Success!')
  })

  it('has a modal to view info of exercises in a workout', () => {
    cy.get('[data-test="workout-exercise-modal-button"]')
      .first()
      .click()

    cy.get('[data-test="workout-exercise-info-modal"]')
      .should('contain', 'Equipment')
      .should('contain', 'BOSU')
      .should('contain', 'TOTAL_BODY')
  })
})
