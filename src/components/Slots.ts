import * as Pixi from 'pixi.js'
import { Column, Keys } from './Column'
import { sleep } from '../utils/sleep'

export class Slots extends Pixi.Container {
  private cols: number = 5

  constructor() {
    super()
    this.init()
  }

  public async startSpin() {
    this.children.forEach(async (col, i) => {
      const column = col as Column
      await sleep(i * 200)

      column.startSpin()
    })
  }

  public async stopSpin(finish: Keys[][]) {
    const promises: Promise<void>[] = []

    this.children.forEach(async (col, i) => {
      const column = col as Column
      await sleep(i * 200)

      promises.push(column.stopSpin(finish[i]))
    })

    await Promise.all(promises)
  }

  private init() {
    // Create the columns
    for (let i = 0; i < this.cols; i++) {
      const col = new Column()

      col.x = i * 88
      this.addChild(col)
    }

    // Create a mask to crop the columns
    const mask = new Pixi.Graphics()
    mask.beginFill(0xffffff)
    mask.drawRect(0, 100, this.cols * 100, 100 * 5 - 17)
    mask.endFill()
    // this.mask = mask

    // Add the frame
    const frame = Pixi.Sprite.from('frame.png')

    this.addChild(frame)
  }
}
