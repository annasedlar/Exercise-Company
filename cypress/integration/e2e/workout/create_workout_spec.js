import exercises from '../../../fixtures/exercise-response'

describe('creating a workout', () => {
  const workoutName = 'Robby Workout'
  let { name } = exercises[0]
  const level1Reps = '10 reps for a score of 1';

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

  it('saves new workout info in redux so user can visit other pages without losing info', () => {
    cy.get('[data-test="workout-name" ]')
      .type(workoutName)
      .trigger('blur')

    cy.get('[data-test="workouts"]')
      .click();

    cy.get('[data-test="workoutbuilder"]')
      .click({force: true})

    cy.get('[data-test="workout-name" ]')
      .should('have.value', workoutName)
  })

  it('shows you all of the workouts', () => {
    cy.get('[data-test="all-exercises"]')
      .should('have.length', 4)
  })

  it('allows for filtering exercises', () => {
    cy.get('[data-test="leg-filter"]')
      .click({force: true})

    cy.get('[data-test="box-filter"]')
      .click({force: true})

    cy.get('[data-test="all-exercises"]')
      .first()
      .contains(name)
  })

  it('has a modal for exercise information', () => {
    cy.get('[data-test="modal-button"]')
      .first()
      .click()

    cy.get('[data-test="exercise-info-modal"]')
      .should('contain', level1Reps)
  })
})
