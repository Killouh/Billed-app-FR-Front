/**
 * @jest-environment jsdom
 */
import { fireEvent, screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES } from '../constants/routes'
import mockStore from "../__mocks__/store.js"

jest.mock("../app/Store", () => mockStore)

// Added dom manipulation
window.alert = jest.fn()
import '@testing-library/jest-dom';



describe("Given I am connected as an employee", () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock 
  })
  window.localStorage.setItem('user', JSON.stringify({
    type: 'Employee'
  }))

  describe("When I am on a newbill and date, price and attached file fields are empty", () => { 
    test ("Then the newbill stay on screen ", () => {

      
      const html = NewBillUI()      
      document.body.innerHTML = html
      
  
      const date = screen.getByTestId("datepicker");
      expect(date.value).toBe("");

      const price = screen.getByTestId("amount");
      expect(price.value).toBe(""); 

      const file = screen.getByTestId("file")
      expect(file.value).toBe("")

      const formNewBill = screen.getByTestId("form-new-bill")
      expect(formNewBill).toBeTruthy()
      
      const sendNewBill = jest.fn((e) => e.preventDefault())
      formNewBill.addEventListener("submit", sendNewBill)
      fireEvent.submit(formNewBill)
      expect(screen.getByTestId("form-new-bill")).toBeTruthy()
    })
  })

  describe("When i download the attached file in the correct format ", () => {
    test ("Then the newbill is sent", () => {
      

      const html = NewBillUI()         
      document.body.innerHTML = html
      const onNavigate = (pathname) => {  
        document.body.innerHTML = ROUTES({ pathname})
      }
      //Newbil instance
      const newBill = new NewBill({ 
        document,
        onNavigate,
        store: mockStore,
        localStorage: window, localStorage,
      })
    
      const uploadFile = jest.fn((e) => newBill.handleChangeFile(e))
      
      const file = screen.getByTestId("file")
      const extensionTest = new File(["testFile"],  "testFile.jpg", {
        type: "image/jpg"
      })
      file.addEventListener("change", uploadFile)
      fireEvent.change(file, {target: {files: [extensionTest]}})
      
      expect(uploadFile).toHaveBeenCalled()
      expect(file.files[0]).toStrictEqual(extensionTest)

      const formNewBill = screen.getByTestId('form-new-bill')
      expect(formNewBill).toBeTruthy()

      const sendNewBill = jest.fn((e) => newBill.handleSubmit(e))//
      formNewBill.addEventListener('submit', sendNewBill)

      //Simulate submit
      fireEvent.submit(formNewBill)
      expect(sendNewBill).toHaveBeenCalled()
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })
  
  })
  describe("When i download the attached file in the wrong format", () => {
    test ("Then i stay on the newbill and a message appears", () => {
      
      const html = NewBillUI()          
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname})
      }
      const newBill = new NewBill({ 
        document,
        onNavigate,
        store: null,
        localStorage: window, localStorage,
      })
      const loadFile = jest.fn((e) => newBill.handleChangeFile(e))
      const file = screen.getByTestId("file")
      const testFormat = new File(["Test"], {
      type: "document/pdf"
      })
      file.addEventListener("change", loadFile)
      fireEvent.change(file, {target: {files: [testFormat]}})
      
      expect(loadFile).toHaveBeenCalled()
      expect(window.alert).toBeTruthy()
    })
  })
  describe("When i fill out the form and i validate it with the send button", () => {
    test("Then the form must be sent to the invoices page",  () => {

      const html = NewBillUI()
      document.body.innerHTML = html
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const currentNewBill = new NewBill({  
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      })
      const formNewBill = screen.getByTestId('form-new-bill')
      expect(formNewBill).toBeTruthy()

      const sendNewBill = jest.fn((e) => currentNewBill.handleSubmit(e))
      formNewBill.addEventListener('submit', sendNewBill)
      fireEvent.submit(formNewBill)
      expect(sendNewBill).toHaveBeenCalled()
      expect(screen.getByText('Mes notes de frais')).toBeTruthy()
    })
  })
})


