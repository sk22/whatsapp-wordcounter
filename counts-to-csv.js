#!/usr/bin/env node

const getStdin = require('get-stdin')

const fs = require('fs')

if (process.argv.length === 3) {
  const dir = process.argv[2]
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  process.chdir(dir)
} 

function processCounts(countsSenders) {
  for (const sender of Object.keys(countsSenders)) {
    const fileName = `counts-${sender}.csv`
    fs.writeFileSync(fileName, 'count,word\n')
    const words = countsSenders[sender]

    const wordPairs = Object.keys(words)
      .map(word => ({ word, count: words[word] }))
      .sort((pre, cur) => cur.count - pre.count)

    for (const { word, count } of wordPairs) {
      fs.appendFileSync(fileName, `${count},${word}\n`)
    }
  }
}

getStdin()
  .then(JSON.parse)
  .then(processCounts)
