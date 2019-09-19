import exercises from '../../../fixtures/exercise-response'
import enums from '../../../fixtures/enum-response'

describe('Creating a new exercise', () => {
  const mensSuggestion = 'Mens Suggested Weight';
  const womensSuggestion = 'Womens Suggested Weight';
  const focusAreas = ["Glutes", "Hamstrings"];
  const focusAreasValues = ["HAMSTRINGS", "GLUTES"]
  const suggestedFeedback = "Feet positioned SHOULDERS width apart"
  const equipment = ["Dumbbells", "Bench"]
  const equipmentValues = ["DUMBBELLS", "BENCH"]
  const newExerciseName = "My New Exercise"

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
    cy.route({
      method: 'POST',
      url: 'URL-hidden/v1/addExercise',
      response: {
        status: {
          error: false
        }
      }
    })

    cy.visit("http://localhost:3000/login?test=1")
    cy.get('button')
      .click()

    cy.get('[data-test="exercises"]')
      .click()
  })

  it('has a link on the exercise page', () => {
    cy.get('[data-test="create-exercise-link"]')
      .contains('Create a new exercise')
      .click()

    cy.get('.exercise-header')
      .contains('Create Exercise!')
  })

  describe('create exercise form', ()=> {
    beforeEach(() => {
      cy.get('[data-test="create-exercise-link"]')
        .click()
    })

    it('has a button to add suggested weights and remove suggested weight', () => {
      cy.get('[data-test="addGenderWeight"]')
        .click()

      cy.get('form')
        .contains(womensSuggestion)

      cy.get('form')
      .contains(mensSuggestion)

      cy.get('[data-test="removeGenderWeight"]')
        .click()

      cy.get('form')
        .should('not.contain', womensSuggestion)

      cy.get('form')
        .should('not.contain', mensSuggestion)
    })

    it('can handle multiple selections for focusAreas', ()=> {
      cy.get('[data-test="focus-areas-input"]')
        .select(focusAreas, {force: true}).invoke('val')
        .should('deep.equal', focusAreasValues)
    })

    it('can handle multiple selections for equipment and wipe equipment', ()=> {
      cy.get('[data-test="equipment-input"]')
        .select(equipment, {force: true}).invoke('val')
        .should('deep.equal', equipmentValues)


      cy.get('[data-test="equipment-input"]')
        .select('No Equipment', {force: true})
        .should('have.value', null)

    })

    it('can handle multiple selections for suggestedFeedbacks', ()=> {
      cy.get('#suggestedFeedbacks')
        .type(suggestedFeedback, {force: true})

      cy.get('.is-focused')
        .last()
        .click()

      cy.get('[data-test="dropdown-div"]')
        .contains(suggestedFeedback)
    })

    it('it has a success alert and form wipes after submit', () => {
      cy.get('form')
        .contains('Exercise Name')

      cy.get('[data-test="exercise-name-input"]')
        .type(newExerciseName)

      cy.get('[data-test="body-area-input"]')
        .select('Cardio', {force: true})
        .should('have.value', 'CARDIO')

      cy.get('[data-test="focus-areas-input"]')
        .select(focusAreas, {force: true}).invoke('val')

      cy.get('#suggestedFeedbacks')
        .type(suggestedFeedback, {force: true})

      cy.get('.is-focused')
        .last()
        .click()

      cy.get('[data-test="level1"]')
        .clear()
        .type(5, {force: true})

      cy.get('[data-test="level2"]')
        .clear()
        .type(10, {force: true})

      cy.get('[data-test="level3"]')
        .clear()
        .type(15, {force: true})

      cy.get('[data-test="level4"]')
        .clear()
        .type(20, {force: true})

      cy.get('[data-test="level5"]')
        .clear()
        .type(25, {force: true})

      cy.get('[data-test="exercise-submit-button"]')
        .click()

      cy.get('.s-alert-success')
        .should('contain', 'Exercise Created!')

      cy.get('[data-test="exercise-name-input"]')
        .should('have.value', '')

      cy.get('[data-test="body-area-input"]')
        .should('have.value', null)
        .should('contain', 'Please Choose One')

      cy.get('[data-test="focus-areas-input"]')
        .should('have.value', null)
        .should('contain', 'Please choose as many as needed')
    })
  })

})
