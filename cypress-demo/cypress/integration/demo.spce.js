describe('百度', () => {
    it('能搜索 ', function () {
        cy.visit('https://www.baidu.com')
        cy.get('input#kw').type('hello')
        cy.contains('百度一下').click()
        cy.contains('百度翻译').should('exist')
    });
})