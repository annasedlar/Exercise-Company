import exercises from '../../../fixtures/exercise-response'

describe('login to view exercises', () => {

  it('wont let you see exercises unless you are logged in', () => {
    cy.visit("http://localhost:3000/exercises")
    cy.get('[data-test="need-to-login"]')
      .contains('Please login!')
    cy.should('not.contain', 'Box explosive step ups')
  })

  it('will let you see exercises if you are logged in', () => {
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

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="exercises"]')
      .click()

    cy.get('[data-test="exercise-header"]')
      .contains('Exercises')
  })

})

describe('admin can search exercises', () => {
  const bosu1 = "Rope drummers from a squat hold on BOSU";
  const bosu2 = "BOSU lower body mountain climber with a twist"
  const boxExercise = "Box explosive step ups"
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

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="exercises"]')
      .click()
  })

  it('looks for the search anywhere in the title and case insensitive', () => {
    cy.get('[data-test="search-bar"]')
      .type('bo')

    cy.contains(bosu1)
    cy.contains(bosu2)
    cy.contains(boxExercise)
  })

  it('filters while typing', () => {
    cy.get('[data-test="search-bar"]')
      .type('bosu')

    cy.contains(bosu1)
    cy.contains(bosu2)
    cy.should('not.contain', boxExercise)
  })
})
