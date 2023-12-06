import { Button } from '@pixi/ui'
import anime from 'animejs'
import * as Pixi from 'pixi.js'

const app = new Pixi.Application<HTMLCanvasElement>({
  width: 640,
  height: 480,
})

const slot1 = Pixi.Sprite.from('/slot-1.png')
slot1.x = 100
slot1.y = 100

const slot2 = Pixi.Sprite.from('/slot-1.png')
slot2.x = 100
slot2.y = 200

const container = new Pixi.Container()

const button = new Button(
  new Pixi.Graphics()
    .beginFill(0xFFFFFF)
    .drawRoundedRect(0, 0, 100, 50, 15)
)

const animation1 = anime({
  targets: slot1,
  y: [{ value: 0, duration: 100 }, { value: 800, delay: 50 }],
  autoplay: false,
  easing: 'linear',
  complete: () => {
    slot1.y = 100
  }
})

const animation2 = anime({
  targets: slot2,
  y: [{ value: 100, duration: 100 }, { value: 900, delay: 50 }],
  autoplay: false,
  easing: 'linear',
  complete: () => {
    slot2.y = 200
  }
})

button.onPress.connect(() => {
  console.log('button pressed')
  animation1.play()
  animation2.play()
})

container.x = 100
container.y = 400

container.addChild(button.view)


app.stage.addChild(slot1)
app.stage.addChild(slot2)
app.stage.addChild(container)
// app.stage.addChild(button.view)



document.body.appendChild(app.view)