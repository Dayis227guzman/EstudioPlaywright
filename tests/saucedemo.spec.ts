import { test, expect } from '@playwright/test';
import { LoginPage } from './POM/LoginPage.';
import path from 'path';

test('Ejemplo Agregar al Carrito', async ({ page }) => {
  
    await page.goto('https://www.saucedemo.com/')

    /*loginpage.ts POM
    
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByRole ('textbox', {name: 'Password', exact:true}).fill('secret_sauce')
    await page.locator('//input[@id=\'login-button\']').click()*/

    /*llama a la clase loginpage.ts POM*/
    const registrarUsuario = new LoginPage(page)
    await registrarUsuario.loginWithCredential('standard_user','secret_sauce')
    await registrarUsuario.checkSuccessfulLogin()

    await page.screenshot({path:'screenshots/LoginPage.png',fullPage:true }) 

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random()*itemsContainer.length)

    const randomItem = itemsContainer[randomIndex]

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description ${expectedDescription}`)


    await randomItem.getByRole ('button', {name: 'Add to cart', exact:true}).click()

    await page.locator('a.shopping_cart_link').click()

    //await page.pause()

    await expect(page.getByRole('button',{name:'Checkout'})).toBeVisible()

    const actualName = await page.locator('div.inventory_item_name').innerText()
    const actualDescription = await page.locator('div.inventory_item_desc').innerText()
    const actualPrice = await page.locator('div.inventory_item_price').innerText()

    await expect(actualName).toEqual(expectedName)
    await expect(actualDescription).toEqual(expectedDescription)
    await expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole ('button', {name: 'Checkout', exact:true}).click()

    await page.getByRole ('textbox', {name: 'First Name'}).fill('Dayana')
    await page.getByRole ('textbox', {name: 'Last Name'}).fill('Guzman')
    await page.getByRole ('textbox', {name: 'Zip/Postal Code'}).fill('050001')

    await page.getByRole ('button', {name: 'Continue', exact:true}).click()

    await page.getByRole ('button', {name: 'Finish', exact:true}).click()

    await expect(page.getByRole('heading',{name:'Thank you for your order'})).toBeVisible()
    
  });

  test('Ejemplo screenshot', async ({ page },testInfo) => {
  
    await page.goto('https://www.saucedemo.com/')

      const registrarUsuario = new LoginPage(page)
    await registrarUsuario.loginWithCredential('standard_user','secret_sauce')
    await registrarUsuario.checkSuccessfulLogin()

    await page.screenshot({path:'screenshots/LoginPage.png',fullPage:true }) 

 await testInfo.attach('login',{
  body:await page.screenshot(),
  contentType:'image/png'
 })
    
  });
 
