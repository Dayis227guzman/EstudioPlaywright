import { test, expect } from '@playwright/test';

test('test web table', async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    const tableContainer = await page.locator("xpath=//table[@id='countries']")
    const rows = await tableContainer.locator("xpath=.//tr").all()

    const countries : Country[] =[]

    /*console.log(rows.length)*/

    for(let row of rows){
        /*console.log(await row.innerText())*/
        let country:Country={
            name: await row.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLanguage: await row.locator("xpath=.//td[5]").innerText()
        }
        countries.push(country)

    }
    /*for (let tabla of countries){
        console.log(tabla)
    }*/

    const filtro = countries.filter(country => country.primaryLanguage === 'Portuguese')
    console.log(filtro)

    /*const row1 = rows.at(1)

    const countryName = await row1?.locator('xpath=.//td[2]').innerText()
    const capitalName = await row1?.locator('xpath=.//td[3]').innerText()
    const currencyName = await row1?.locator('xpath=.//td[4]').innerText()
    const languageName = await row1?.locator('xpath=.//td[5]').innerText()

    console.log(countryName , capitalName, currencyName, languageName)*/

    /*
    elkemento container :    //table[@id='countries']
    .//tr[2] filas
    .//td[1] columnas
    
    //table[@id='countries']//tr[2]//td[1] Visited (check)
    //table[@id='countries']//tr[2]//td[2] Country
    //table[@id='countries']//tr[2]//td[3] Capital(s)
    //table[@id='countries']//tr[2]//td[4] Currency
    //table[@id='countries']//tr[2]//td[5] Primary Language(s)

    */
 })

 interface Country{
    name: string
    capital: string
    currency: string
    primaryLanguage: string
 }