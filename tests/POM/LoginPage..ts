import { expect, Locator, Page } from "@playwright/test"

export class LoginPage{

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon:Locator

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.shoppingCartIcon =page.locator('a.shopping_cart_link')
    }
    async fillUsername(username: string){
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string){
        await this.passwordTextbox.fill(password)
    }

    async fillLogin(){
        await this.loginButton.click()
    }

    async loginWithCredential(username:string,password:string){

        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.fillLogin()

    }

async checkSuccessfulLogin(){
    await expect(this.shoppingCartIcon).toBeVisible()
}

}