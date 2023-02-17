/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

// Added dom manipulation
import '@testing-library/jest-dom';


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then  It should renders NewBill page", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
    test("Then letter icon in vertical layout should be highlighted", () => {
      //Verifier la classe active du letter icon
    })

    describe('When I choose a file', () => {
      test("I should be warned if refused", () => {
        // Verifier le format du fichier envoyé
      })
    })

    describe('When I click on the exit icon', () => {
      test("I should go back to login screen", () => {
        // Vérifier le fonctionnement du bouton exit
      })
    })
    describe('When I click on the submit button', () => {
      test("I should go back to Bills list", () => {
        // Verifier que l'on est logout
      })
      test("I should send data to the back", () => {
        //Verifier que les données sont bien envoyée
      })

    })
  })
})
