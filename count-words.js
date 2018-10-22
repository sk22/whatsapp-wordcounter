#!/usr/bin/env node

const getStdin = require('get-stdin')

const pretty = process.argv.includes('--pretty')

const word = /[a-z0-9äöüßẞ]+/ig

function matchWords(message) {
  return message.match(word)
}

function countWords(words) {
  let counts = {}
  for (const word of words) {
    if (counts[word]) {
      counts[word]++
    } else {
      counts[word] = 1
    }
  }
  return counts
}

function joinMessages(messages) {
  let strings = {}
  for (const { message, sender } of messages) {
    if (strings[sender]) {
      strings[sender] += ` ${message.toLowerCase()}`
    } else {
      strings[sender] = message
    }
  }
  return strings
}

function countBySender(stringsBySender) {
  let counts = {}
  for (const sender of Object.keys(stringsBySender)) {
    counts[sender] = countWords(matchWords(stringsBySender[sender]))
  }
  return counts
}

function processMessages(messages) {
  // [ { message: 'foo', sender: 'root', date: '...' } ]
  const stringsBySender = joinMessages(messages)
  const counts = countBySender(stringsBySender)
  console.log(JSON.stringify(counts, null, pretty && 2))
}

getStdin()
  .then(JSON.parse)
  .then(processMessages)
