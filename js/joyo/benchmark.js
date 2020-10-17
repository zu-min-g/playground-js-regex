const { performance } = require('perf_hooks');
const lib = require("../../dist/module/index")
benchmark = (run) => {
  const begin = performance.now()
  run()
  const score = performance.now() - begin
  console.log(score)
  return score
}

const inverse = []
for (const item of lib.joyo) {
  inverse[item] = true
}

const pattern = new RegExp('['+lib.joyo.toRegexPattern()+']', 'g')

const LOOP = 1000000
// const search = "亜" // 最初の文字
// const search = "腕" // 最後の文字
const search = "親" // 真ん中くらい

console.log("正規表現")
benchmark(() => {
  for (let i = 0;i < LOOP;i++) {
    pattern.lastIndex = 0
    if (pattern.test(search) !== true) {
      throw new Error()
    }
  }
})

console.log("----------")

console.log("マップ")
benchmark(() => {
  for (let i = 0;i < LOOP;i++) {
    if (inverse[search] !== true) {
      throw new Error()
    }
  }
})
