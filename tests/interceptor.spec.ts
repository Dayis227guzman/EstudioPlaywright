import { test, expect } from '@playwright/test';
import { LoginPage } from './POM/LoginPage.';
import path from 'path';

test('ejemplo interceptor', async ({ page }) => {
    //trae todas las urls
    /* await page.on("request",req =>{
        console.log(req.url())
     })*/

    //una imagen especifica
    /*
         await page.route(
            "https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
            (route) =>route.abort()
    
         );*/

    //todas las imagenes

    await page.route(
        "**/*.{.png,jpg,jpeg,svg}",
        (route) => route.abort()

    );

    await page.goto('https://www.saucedemo.com/')

    const registrarUsuario = new LoginPage(page)
    await registrarUsuario.loginWithCredential('standard_user', 'secret_sauce')
    await registrarUsuario.checkSuccessfulLogin()

    await page.screenshot({ path: 'screenshots/interceptor.png', fullPage: true })



});

test('ejemplo interceptor respuesta servio', async ({ page }) => {


    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => (
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{
    "books": [
        {
            "isbn": "9781449325862",
            "title": "EL libro que Alejandro nunca va a leer",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 1000,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}`
            })
        )

    );



    await page.goto('https://demoqa.com/books/')
    await page.pause()
    await page.screenshot({ path: 'screenshots/cambiarRespuestaLibro.png', fullPage: true })



});


