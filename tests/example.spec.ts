import { test, expect } from '@playwright/test';


test('Comprar cel Mercado libre', async ({ page }) => {
  
  await page.goto('https://www.mercadolibre.com.co/')
  await page.locator('//input[@id=\'cb1-edit\']').fill('Iphone')
  await page.keyboard.press('Enter')
  await expect(page.locator('//ol[contains (@class, \'ui-search-layout\')]')).toBeVisible()
  // await page.pause()
   const titles = await page.locator('//ol[contains (@class, \'ui-search-layout\')]//li//h2').allInnerTexts()

console.log('the total number of resul is: ', titles.length)

   for(let title of titles){
    console.log('the title is: ',title)
   }
});

test('pruebas localizadores', async ({ page }) => {
  
   await page.goto('https://www.mercadolibre.com.co/')
   
   // nombre de la imagen (logo)
   //await page.getByAltText

   // placeholder (email@gmail.com)
   //await page.getByPlaceholder

   //rol
   //await page.getByRole ('link', {name: 'Mis compras'}).click()

   //para que ingrese exactamene a un rol. si tiene un nombre de rol epetido
   await page.getByRole ('link', {name: 'Ingresa', exact:true}).click()
   
 });
