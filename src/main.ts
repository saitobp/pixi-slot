import { Application } from 'pixi.js'
import { createSlotColumn } from './slotColumn'

const app = new Application<HTMLCanvasElement>()

document.body.appendChild(app.view)

/** Add a button that when clicked, reset the slot position */
const button = document.createElement('button')

const column1 = await createSlotColumn({
  app: app,
  x: 135,
  delay: 0,
})

const column2 = await createSlotColumn({
  app: app,
  x: 220,
  delay: 5,
})

const column3 = await createSlotColumn({
  app: app,
  x: 305,
  delay: 10,
})

const column4 = await createSlotColumn({
  app: app,
  x: 390,
  delay: 15,
})

const column5 = await createSlotColumn({
  app: app,
  x: 475,
  delay: 20,
})

button.innerText = 'Play'
button.addEventListener('click', () => {
  column1.restart()
  column2.restart()
  column3.restart()
  column4.restart()
  column5.restart()
})

document.body.appendChild(button)
