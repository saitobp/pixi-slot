import { Button } from '@pixi/ui'
import * as Pixi from 'pixi.js'
import { Keys } from './components/Column'
import { Slots } from './components/Slots'
import './style.css'

const app = new Pixi.Application<HTMLCanvasElement>({
  width: 480,
  height: 800,
})

const background = Pixi.Sprite.from('background.png')

const end: Keys[][] = [
  ['9', '9', '9', '9', '9'],
  ['9', '9', '9', '9', '9'],
  ['9', '9', '9', '9', '9'],
  ['9', '9', '9', '9', '9'],
  ['9', '9', '9', '9', '9'],
]

const slots = new Slots()
slots.y = slots.y + 100

const container = new Pixi.Container()
const start = new Button(
  new Pixi.Graphics().beginFill(0xffffff).drawRoundedRect(-44, 0, 80, 40, 12),
)

const stop = new Button(
  new Pixi.Graphics().beginFill(0xff0fff).drawRoundedRect(44, 0, 80, 40, 12),
)

start.onPress.connect(async () => {
  slots.startSpin()
})

stop.onPress.connect(async () => {
  slots.stopSpin(end)
})

container.x = 200
container.y = 752

container.addChild(start.view)
container.addChild(stop.view)

app.stage.addChild(background)
app.stage.addChild(container)
app.stage.addChild(slots)

app.view.classList.add('game-canvas')

document.body.appendChild(app.view)
