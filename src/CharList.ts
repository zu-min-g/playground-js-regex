import { Range } from "./Range"

export class CharList implements Iterable<string> {
  constructor(protected list: string[]) {}

  [Symbol.iterator](): Iterator<string> {
    return this.list[Symbol.iterator]()
  }

  toCodePoints(): number[] {
    const list = new Set<number>()
    this.list.forEach((item) => {
      list.add(item.codePointAt(0) as number)
    })
    return [...list]
  }

  toMergedCodePoints(): Range[] {
    const arr = this.toCodePoints()
    arr.sort((x, y) => {
      return x - y
    })
    const blocks: Range[] = []
    if (arr.length === 0) {
      return blocks
    }
    let prev = -1
    let begin = -1
    arr.forEach((item) => {
      if (begin === -1) {
        begin = item
        prev = item
        return
      }
      if (prev + 1 === item) {
        prev = item
      } else {
        blocks.push({ start: begin, end: prev })
        begin = item
        prev = item
      }
    })
    blocks.push({ start: begin, end: prev })
    return blocks
  }

  toRegexPattern(unicode = true, upperCase = false): string {
    let func: (code: number) => string

    if (unicode) {
      func = function (code: number): string {
        let hex = code.toString(16)
        if (upperCase) {
          hex = hex.toUpperCase()
        }
        if (code > 0xffff) {
          return "\\u{" + hex + "}"
        }
        return "\\u" + hex
      }
    } else {
      func = function (code: number): string {
        return String.fromCodePoint(code)
      }
    }

    return this.toRegexPatternMain(func)
  }

  toRegexPatternMain(func: (code: number) => string): string {
    const arr = this.toMergedCodePoints()

    let regex = ""
    arr.forEach((item) => {
      if (item.start === item.end) {
        regex += func(item.start)
      } else if (item.start + 1 === item.end) {
        regex += func(item.start)
        regex += func(item.end)
      } else {
        regex += func(item.start)
        regex += "-"
        regex += func(item.end)
      }
    })
    return regex
  }
}
