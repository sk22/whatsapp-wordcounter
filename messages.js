#!/usr/bin/env node

const getStdin = require('get-stdin')

const pretty = process.argv.includes('--pretty')

const message = /(?<date>\d{1,2}\/\d{1,2}\/\d{1,2}, \d{1,2}:\d{1,2}(?:\s[AP]M)?) - (?<sender>.*?): (?<message>[\s\S]*?)\n(?=\d{1,2}\/\d{1,2}\/\d{1,2}, \d{1,2}:\d{1,2}(?:\s[AP]M)? - .*?: )?/g

function processText(text) {
  const matches = []

  while (true) {
    const match = message.exec(text)
    if (!match) break
    if (!match[1]) continue
    matches.push(match.groups)
  }

  console.log(JSON.stringify(matches, null, pretty && 2))
}

getStdin().then(processText)
