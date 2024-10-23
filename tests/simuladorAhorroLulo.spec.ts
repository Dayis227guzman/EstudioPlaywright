import { test, expect } from '@playwright/test';

test('test simular ahorro lulo ok', async ({ page }) => {
  await page.goto('https://www.lulobank.com/');
  await page.getByText('¿Qué puedes hacer?').click()
  await page.getByRole('navigation').getByRole('link', { name: 'Ahorra tu plata' }).click()
  await page.getByRole('link', { name: 'Calcular mis ahorros' }).click();
  await page.getByPlaceholder('Monto').click();
  await page.getByPlaceholder('Monto').fill('1000000');
  await page.getByRole('combobox').selectOption('12');
  await page.getByRole('button', { name: 'Calcular' }).click();
  await page.screenshot({path:'screenshots/resultadosimulador.png',fullPage:true})
  await page.getByText('Resultado simulación:').click();
});