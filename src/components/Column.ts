import anime, { AnimeInstance } from 'animejs'
import * as Pixi from 'pixi.js'
import { sleep } from '../utils/sleep'

export type Keys = keyof typeof textures

const textures = {
  '1': 'slot-acai',
  '2': 'slot-banana',
  '3': 'slot-butterfly',
  '4': 'slot-chest',
  '5': 'slot-guarana',
  '6': 'slot-lily-pad',
  '7': 'slot-monkey',
  '8': 'slot-piranha',
  '9': 'slot-scatter',
}

export class Column extends Pixi.Container {
  private rows: number = 5
  private animation?: AnimeInstance
  private spacing: number = 88
  private stop: boolean = false
  private duration: number = 80
  private spins: number = 0
  private offset: number = 20

  constructor() {
    super()

    this.init()
  }

  public async startSpin() {
    // If is the first spin, go up a little bit
    if (this.spins === 0) {
      const start = anime({
        targets: this,
        y: this.y - this.offset,
        duration: 260,
        easing: 'easeInSine',
      })

      await start.finished
      await sleep(100)
      this.y = this.y + this.offset
    }

    const buffer = Pixi.Sprite.from(textures['5'] + '-blur' + '.png')
    const first = this.getChildAt(0)
    const last = this.getChildAt(this.rows - 1)

    buffer.x = first.x
    buffer.y = first.y - this.spacing
    buffer.scale = first.scale

    this.addChildAt(buffer, 0)

    this.animation = anime({
      targets: this,
      y: this.y + this.spacing,
      duration: this.duration,
      easing: 'linear',
      complete: () => {
        if (this.stop) {
          this.stop = false
          return
        }

        this.spins++

        this.removeChild(last)
        this.startSpin()
      },
    })
  }

  public async stopSpin(finish: Keys[]) {
    await sleep(200)

    this.stop = true
    this.spins = 0

    if (!this.animation) return

    await this.animation.finished

    finish.forEach((key) => {
      const slot = Pixi.Sprite.from(textures[key] + '.png')
      const first = this.getChildAt(0)

      slot.x = slot.x + 28
      slot.y = first.y - this.spacing
      slot.scale = new Pixi.Point(0.75, 0.75)

      this.addChildAt(slot, 0)
    })

    const finalPosition = this.y + this.spacing * this.rows

    anime({
      targets: this,
      y: [
        {
          value: finalPosition + this.offset,
          duration: this.duration * this.rows,
          easing: 'linear',
        },
        {
          value: finalPosition,
          duration: 200,
          easing: 'easeOutSine',
        },
      ],
      complete: () => {
        this.stop = false

        for (let i = 0; i < finish.length + 1; i++) {
          const last = this.children[this.children.length - 1]
          this.removeChild(last)
        }
      },
    })
  }

  private init() {
    for (let i = 0; i < this.rows; i++) {
      const slot = Pixi.Sprite.from(textures['5'] + '.png')

      slot.x = slot.x + 28
      slot.y = i * this.spacing + 28
      slot.scale = new Pixi.Point(0.75, 0.75)

      this.addChild(slot)
    }
  }
}
