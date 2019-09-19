import exercises from '../../../fixtures/exercise-response'
import enums from '../../../fixtures/enum-response'

describe('Editing an exercise', ()=> {

  describe('Only show suggested weights if needed', () => {
    const { name } = exercises[2]
    it('wont have unnecessary inputs', () => {
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
        method: 'PUT',
        url: 'URL-hidden/v1/modifyExercise',
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

      cy.get('[data-test="search-bar"]')
        .type(name)

      cy.get('[data-test="edit-exercise-button"]')
        .click()

      cy.get('form')
        .should('not.contain', 'Mens Suggested Weight')
        .should('not.contain', 'Womens Suggested Weight')
    })
  })

  describe('Updating exercise that has every data type', () => {
    const { name, bodyTypes, focusAreas, repsToPoints, suggestedWeightMen, suggestedWeightWomen } = exercises[0]
    const editedExerciseName = "This exercise was changed";
    const editedExerciseBodyType = "Cardio";
    const newFocusAreas = ["Glutes", "Hamstrings"];
    const repAmountString = repsToPoints[4].toString();
    const menWeightAmountString = suggestedWeightMen[0].toString();
    const womenWeightAmountString = suggestedWeightWomen[2].toString();
    const newRepAmount = '40';
    const newMenWeightAmount = '8';
    const newWomenWeightAmount = '9';
    const newEquipment = ["Dumbbells", "Bench"];
    const newEquipmentValues = ["DUMBBELLS", "BENCH"];
    const mensSuggestion = 'Mens Suggested Weight';
    const womensSuggestion = 'Womens Suggested Weight';
    const originalFeedback = "Feet positioned SHOULDERS width apart"
    const newFeedback = "Feet positioned in wide stance"

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
        method: 'PUT',
        url: 'URL-hidden/v1/modifyExercise',
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

      cy.get('[data-test="search-bar"]')
        .type(name)

      cy.get('[data-test="edit-exercise-button"]')
        .click()
    })

    it('keeps track of changes on the form and updates the exercise', () => {
      // Only need a couple of examples to show it works
      cy.get('[data-test="exercise-name-input"]')
        .should('have.value', name)
        .clear()
        .type(editedExerciseName)
        .should('have.value', editedExerciseName)

      cy.get('[data-test="body-area-input"]')
        .should('have.value', bodyTypes[0])
        .select(editedExerciseBodyType, {force: true})
        .should('have.value', 'CARDIO')

      cy.get('[data-test="exercise-submit-button"]')
        .click()

      cy.get('[data-test="exercises"]')
        .click()

      cy.get('[data-test="search-bar"]')
        .clear()

      cy.get('.ex-cards')
        .first()
        .contains(editedExerciseName)
        .should('not.contain', name)
        .contains(editedExerciseBodyType.toUpperCase())
        .should('not.contain', bodyTypes[0])
    })

    it('gives success alert', () => {
      cy.get('[data-test="exercise-submit-button"]')
        .click()

      cy.get('.s-alert-success')
        .should('contain', 'Exercise updated!')
    })


    it('can handle multiple selections for focusAreas', ()=> {
      cy.get('[data-test="focus-areas-input"]')
        .select(newFocusAreas, {force: true}).invoke('val')
        .should('deep.equal', ["HAMSTRINGS", "GLUTES"])
    })

    it('can wipe equipment and chose multiple after', ()=> {
      cy.get('[data-test="equipment-input"]')
        .select('No Equipment', {force: true})
        .should('have.value', null)

      cy.get('[data-test="equipment-input"]')
        .select(newEquipment, {force: true}).invoke('val')
        .should('deep.equal', newEquipmentValues)

    })

    it('can remove suggested weights', () => {
      cy.get('[data-test="removeGenderWeight"]')
        .click()

      cy.get('[data-test="exercise-submit-button" ]')
        .click()

      cy.get('[data-test="exercise-submit-button"]')
        .click()

      cy.get('[data-test="exercises"]')
        .click()

      cy.get('[data-test="search-bar"]')
        .clear()
        .type(name)

      cy.get('[data-test="edit-exercise-button"]')
        .click()

      cy.get('form')
        .should('not.contain', womensSuggestion)

      cy.get('form')
        .should('not.contain', mensSuggestion)
    })

    it('will update reps and suggested weights', () => {
      cy.get('[data-test="level5"]')
        .should('have.value', repAmountString)
        .clear()
        .type(newRepAmount, {force: true})
        .should('have.value', newRepAmount)

        cy.get('[data-test="level3Women"]')
          .should('have.value', womenWeightAmountString)
          .clear()
          .type(newWomenWeightAmount, {force: true})
          .should('have.value', newWomenWeightAmount)
    })

    it('will have suggested feedback and can add more', () => {
      cy.get('[data-test="dropdown-div"]')
        .contains(originalFeedback)

      cy.get('#suggestedFeedbacks')
        .type(newFeedback)

      cy.get('.is-focused')
        .last()
        .click()

      cy.get('[data-test="dropdown-div"]')
        .contains(newFeedback)
    })
  })


})
