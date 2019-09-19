import exercises from '../../../fixtures/exercise-response'
import enums from '../../../fixtures/enum-response'

describe('an admin can see a view for one exercise', () => {

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
  })

  it('each exercise has a link to a view page', () => {
    cy.get('.ex-cards').contains('View');
  })

  it('can reach the edit form from the view page', () => {
    const { name } = exercises[0]
    const editButtonContent = "Edit Exercise"

    cy.get('[data-test="exercise-view-button"]')
      .first()
      .click()

    cy.get('[data-test="edit-exercise-button"]')
      .contains(editButtonContent)
      .click()

    cy.get('[data-test="exercise-name-input"]')
      .should('have.value', name)
  })

  it('organizes feedback by type', () => {
    cy.get('[data-test="exercise-view-button"]')
      .first()
      .click()

    cy.get('.feedback-header')
      .should('have.length', 8)
  })

  describe('handle workout with no weight for men or women', () => {
    const { id, name, repsToPoints } = exercises[3]
    const exerciseBodyType = 'Core'
    const exerciseEquipment = 'No Equipment Needed'
    const focusArea = 'Core'
    const feedBack = 'Feet positioned next to each other'
    const noWeight = 'No weight suggestions'

    it('links to a new url with all of the exercise info', () => {
      cy.get('[data-test="exercise-view-button"]')
        .last()
        .click()


      cy.url().should('eq', 'http://localhost:3000/exercises/' + id)
      cy.get('[data-test="exercise-header"]')
        .contains(name)
      cy.get('[data-test="exercise-bodytype"]')
        .contains(exerciseBodyType)
      cy.get('[data-test="no-equipment-header"]')
        .contains(exerciseEquipment)
      cy.get('[data-test="exercise-focusAreas"]')
        .contains(focusArea)
      cy.get('[data-test="exercise-repsToPoints"]')
        .contains(repsToPoints[0])
      cy.get('[data-test="exercise-menWeight"]')
        .contains(noWeight)
      cy.get('[data-test="exercise-womenWeight"]')
        .contains(noWeight)
      cy.get('[data-test="exercise-feedbacks"]')
        .contains(feedBack)
    })
  })

  describe('handle workout with weight for men or women', () => {
    const { id, name, repsToPoints, suggestedWeightMen, suggestedWeightWomen } = exercises[0]
    const exerciseBodyType = 'Legs'
    const exerciseEquipment = 'Box'
    const focusArea1 = 'Legs'
    const focusArea2 = 'Cardio'
    const feedBack = "Feet positioned SHOULDERS width apart"

    it('links to a new url with all of the exercise info', () => {
      cy.get('[data-test="exercise-view-button"]')
        .first()
        .click()

      cy.url().should('eq', 'http://localhost:3000/exercises/' + id)
      cy.get('[data-test="exercise-header"]')
        .contains(name)
      cy.get('[data-test="exercise-bodytype"]')
        .contains(exerciseBodyType)
      cy.get('[data-test="equipment-div"]')
        .contains(exerciseEquipment)
      cy.get('[data-test="exercise-focusAreas"]')
        .contains(focusArea2)
      cy.get('[data-test="exercise-focusAreas"]')
        .contains(focusArea1)
      cy.get('[data-test="exercise-repsToPoints"]')
        .contains(repsToPoints[0])
      cy.get('[data-test="exercise-menWeight"]')
        .contains(suggestedWeightMen[0])
      cy.get('[data-test="exercise-womenWeight"]')
        .contains(suggestedWeightWomen[0])
      cy.get('[data-test="exercise-feedbacks"]')
        .contains(feedBack)
    })
  })


})
