import { homepageEN, homepageID, phone_provider, send_simulation } from '/cypress/support/pages/homepage.js'

const en = new homepageEN()
const id = new homepageID()
const qna = new phone_provider()
const sim = new send_simulation()

describe('Check Language', function(){


    it('Check Language ID', function(){
        cy.visit('http://flip.id');
        id.btn_Karir()
        id.btn_TentangFLIP()
        id.btn_Produk()
        id.label_h3_ID()
        id.label_h1_ID()
        id.label_QR_ID()

    })


    it('Check Language EN', function() {
        en.btn_LangEN()
        cy.wait(3000)
        en.btn_Career()
        en.btn_AboutFLIP()
        en.btn_Product()
        en.label_h3_EN()
        en.label_h1_EN()
        en.label_QR_EN()
    })


})

describe('Check Phone Provider', function() {

    it('User check Phone Provider', function() {
        id.btn_LangID()
        cy.wait(1000)
        qna.scrollto_qna()
        qna.div_QnA()
        qna.accordion5_question()
        qna.accordion5_answer()
    })
})


describe('Simulation Send Money', function() {

    it('User open Simulation Page', function() {
        
        sim.scrollto_sendMoney()
        sim.btn_sendMoneySim()
        
        // Assertion Simulation Page
        sim.assert_simulationPage()

        sim.changeto_GBP()
        sim.assert_GBP()
        sim.check_rateGBP()
        sim.do_simulation()
    })
})