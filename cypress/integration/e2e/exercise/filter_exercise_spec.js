import exercises from '../../../fixtures/exercise-response'

describe('admin can filter exercises by bodyTypes', () => {
  const legExerciseName = 'Box explosive step ups';
  const totalbodyExerciseName = 'Rope drummers from a squat hold on BOSU';
  const coreExerciseName = 'BOSU lower body mountain climber with a twist'

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

  it('handles one filter',  () => {
    cy.get('[data-test="leg-filter"]')
      .click({force: true})

    cy.contains(legExerciseName)
    cy.should('not.contain', totalbodyExerciseName)
    cy.should('not.contain', coreExerciseName)
  })

  it('handles multiple filters', () => {
    cy.get('[data-test="leg-filter"]')
      .click({force: true})
    cy.get('[data-test="total-body-filter"]')
      .click({force: true})

      cy.contains(legExerciseName)
      cy.contains(totalbodyExerciseName)
      cy.should('not.contain', coreExerciseName)
  })

  it('resets filters if all filters are toggled off', () => {
    cy.get('[data-test="leg-filter"]')
      .click({force: true})

    cy.contains(legExerciseName)
    cy.should('not.contain', totalbodyExerciseName)
    cy.should('not.contain', coreExerciseName)

    cy.get('[data-test="leg-filter"]')
      .click({force: true})
    cy.contains(legExerciseName)
    cy.contains(totalbodyExerciseName)
    cy.contains(coreExerciseName)

  })

  it('toggles off one filter but leaves other filters on', () => {
    cy.get('[data-test="leg-filter"]')
      .click({force: true})
    cy.get('[data-test="total-body-filter"]')
      .click({force: true})

      cy.contains(legExerciseName)
      cy.contains(totalbodyExerciseName)
      cy.should('not.contain', coreExerciseName)

    cy.get('[data-test="total-body-filter"]')
      .click({force: true})

    cy.contains(legExerciseName)
    cy.should('not.contain', totalbodyExerciseName)
    cy.should('not.contain', coreExerciseName)
  })
})

describe('admin can filter by equipment', () => {
  const boxExercise = "Box explosive step ups"
  const benchExercise = "Box explosive step ups";
  const bosuExercise1 = "Rope drummers from a squat hold on BOSU";
  const bosuExercise2 = "BOSU lower body mountain climber with a twist";
  const noEquipmentExercise = "Lying bent leg baseball swings";


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

  it('finds primary equipment if only one filter', () => {
    cy.get('[data-test="box-filter"]')
      .click({force: true})

      cy.get('.ex-cards')
        .first()
        .should('contain', boxExercise)
      cy.get('.ex-cards')
        .last()
        .should('contain', bosuExercise1)
    cy.should('not.contain', bosuExercise2)
  })

  it('filters by primary and secondary equipment', () => {
    cy.get('[data-test="box-filter"]')
      .click({force: true})

    cy.get('[data-test="bench-filter"]')
      .click({force: true})
    cy.get('.ex-cards')
      .first()
      .should('contain', boxExercise)
    cy.should('not.contain', bosuExercise2)
  })

  it('resets filters if all filters are toggled off', () => {
    cy.get('[data-test="box-filter"]')
      .click({force: true})

    cy.contains(boxExercise)
    cy.should('not.contain', bosuExercise1)
    cy.should('not.contain', bosuExercise2)

    cy.get('[data-test="box-filter"]')
      .click({force: true})

    cy.contains(boxExercise)
    cy.contains(bosuExercise1)
    cy.contains(bosuExercise2)

  })

  it('has a filter for no equipment', () => {
    cy.get('#input_17')
      .click({force: true})

    cy.get('.ex-cards')
      .first()
      .contains(noEquipmentExercise)
  })

  it('toggles off one filter but leaves other filters on', () => {
    cy.get('[data-test="box-filter"]')
      .click({force: true})

    cy.get('[data-test="bench-filter"]')
      .click({force: true})

    cy.get('.ex-cards')
      .first()
      .should('contain', boxExercise)
    cy.should('not.contain', bosuExercise1)
    cy.should('not.contain', bosuExercise2)

    cy.get('[data-test="bench-filter"]')
      .click({force: true})

      cy.get('[data-test="bench-filter"]')
        .click({force: true})
      cy.get('.ex-cards')
        .first()
        .should('contain', boxExercise)
      cy.should('not.contain', bosuExercise2)

  })

  describe('filtering with both equipment and bodyType', () => {
    const boxLegExercise = "Box explosive step ups"
    const bosuTotalBodyExercise = "Rope drummers from a squat hold on BOSU";
    const bosuCoreExercise = "BOSU lower body mountain climber with a twist";

    it('handles filtering with both', () => {
      cy.get('[data-test="box-filter"]')
        .click({force: true})

      cy.get('[data-test="total-body-filter"]')
        .click({force: true})

        cy.contains(bosuTotalBodyExercise)
        cy.should('not.contain', bosuCoreExercise)
        cy.should('not.contain', boxLegExercise)
    })
  })

})
