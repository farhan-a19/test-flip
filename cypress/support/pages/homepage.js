let rate;

class homepageEN {
    btn_LangEN() {
        return cy.contains('EN').click()
    }

    btn_Career() {
        return cy.get('#popover-trigger-11').should('have.text','Career')
    }

    btn_AboutFLIP() {
        return cy.get('#popover-trigger-10').should('have.text','About Flip')
    }

    btn_Product() {
        return cy.get('#popover-trigger-12').should('have.text','Product')
    }

    label_h3_EN() {
        return cy.get('#home-hero > div.css-1i4e2jv > h3').should('have.text','Free financial transactions, to anyone.')
    }

    label_h1_EN() {
        return cy.get('#home-hero > div.css-1i4e2jv > h1').should('have.text','Transfer from different banks, top up e-wallet, send money abroad, and buy digital products. All with lower cost!')
    }

    label_QR_EN() {
        return cy.get('p[class="chakra-text css-10o87ku"]').should('have.text','Scan this QR to download Flip app')
    }
}


class homepageID {
    btn_LangID() {
        return cy.contains('ID').click()
    }

    btn_Karir() {
        return cy.get('#popover-trigger-8').should('have.text','Karir')
    }

    btn_TentangFLIP() {
        return cy.get('#popover-trigger-7').should('have.text','Tentang Flip')
    }

    btn_Produk() {
        return cy.get('#popover-trigger-9').should('have.text','Produk')
    }

    label_h3_ID() {
        return cy.get('#home-hero > div.css-1i4e2jv > h3').should('have.text','Bebas transaksi, ke siapa aja.')
    }

    label_h1_ID() {
        return cy.get('#home-hero > div.css-1i4e2jv > h1').should('have.text','Transfer beda bank, top up e-wallet, kirim uang ke luar negeri, dan beli produk digital. Semua lebih terjangkau!')
    }

    label_QR_ID() {
        return cy.get('p[class="chakra-text css-10o87ku"]').should('have.text','Scan QR dan download aplikasi Flip')
    }
}

class phone_provider {
    div_QnA() {
        return cy.get('#home > section.css-xr4r6p > div.css-q8pb6o > div.panel-container.css-5p9ymo > h2').should('have.text', 'Pertanyaan seputar Flip')
    }

    scrollto_qna() {
        return cy.contains('Pertanyaan seputar Flip').scrollIntoView()
    }

    accordion5_question() {
        return cy.contains('Adakah layanan pembelian pulsa, paket data serta PPOB di Flip?').click()
    }

    accordion5_answer() {
        return cy.get('div[class="chakra-accordion__panel css-6ksmyt"]').eq(4).should('contain', 'Axis, Indosat Ooredoo, Smartfren, Telkomsel, Tri, XL')
    }

}

class send_simulation {
    
    div_sendMoneySim() {
        return cy.get('#home > section.css-1x9gyb > div.css-kaqrt5 > div > h2').should('have.text', 'Kirim uang ke luar negeri')
    }

    scrollto_sendMoney() {
        return cy.contains('Kirim uang ke luar negeri').scrollIntoView()
    }

    btn_sendMoneySim() {
        return cy.get('#home > section.css-1x9gyb > div.css-kaqrt5 > div > a').click()
    }

    assert_simulationPage() {
        cy.get('button[class="chakra-menu__menu-button css-1l1pwnu"]').should('be.visible')
        cy.get('input[placeholder="Masukkan nominal dalam IDR"]').should('be.visible')
        cy.get('input[placeholder="Masukkan nominal dalam USD"]').should('be.visible')
    }

    assert_GBP() {
        cy.get('input[placeholder="Masukkan nominal dalam GBP"]').should('be.visible')
        cy.get('p[class="chakra-text css-1int6b7"]').eq(1).should('have.text', '65.000 IDR')
    }

    changeto_GBP() {
        cy.get('button[class="chakra-menu__menu-button css-1l1pwnu"]').click()
        cy.wait(2000)
        cy.contains('United Kingdom').click()
        return this
    }

    do_simulation() {
        let amount_IDR = 5000000;
        cy.get('input[placeholder="Masukkan nominal dalam IDR"]').type(amount_IDR)
        cy.wait(3000)
        cy.fixture('rate.json').then(rate => {
            let rate_GBP = parseFloat(rate.rateGBP)
            cy.log('Rate GBP ADALAH : ' + rate_GBP)
            let GBP_IDR = 0;
            let rounded_result = 0;

            GBP_IDR = amount_IDR/rate_GBP;
            rounded_result = parseFloat(GBP_IDR.toFixed(2));

            cy.xpath('//*[@id="__next"]/div/div/div[3]/div/div[2]/div[2]/div[2]/div[2]/input').invoke('val').as('nominal_GBP').then((nominal_GBP) => {
            
            let nominalGBP = 0;
            nominalGBP = parseFloat(nominal_GBP.replace(',', '.')).toFixed(2)*1
            expect(nominalGBP).to.equal(rounded_result)
        })
        });
        
    }

    check_rateGBP() {
        cy.wait(1000)
        cy.xpath('//*[@id="__next"]/div/div/div[3]/div/div[2]/div[2]/div[3]/div/p').invoke('text').then((text) => {
            cy.log(text)
            let text1 = text.substring(8,17)
            let text2 = text1.replace('.','')
            let text3 = text2.replace(',','.')
            let rate = {
                "rateGBP": text3,
            }
            cy.writeFile('./cypress/fixtures/rate.json', rate)
        })
    }
}


module.exports = {homepageEN, homepageID, phone_provider, send_simulation}