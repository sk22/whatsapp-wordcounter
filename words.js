#!/usr/bin/env node

const getStdin = require('get-stdin')

const pretty = process.argv.includes('--pretty')

const word = /[a-z0-9äöü]+/ig

function matchWords(message) {
  return message.match(word)
}

function countWords(words) {
  return words.reduce(
    (counts, word) =>
      word ? { ...counts, [word]: (counts[word] || 0) + 1 } : counts,
    {}
  )
}

function aggregateSenders(previousStrings, { message, sender }) {
  return {
    ...previousStrings,
    [sender]: `${previousStrings[sender] || ''} ${message}`
  }
}

function processMessages(messages) {
  // [ { message: 'foo', sender: 'root', date: '...' } ]
  const stringsBySender = messages.reduce(aggregateSenders, {})
  const wordCounts = Object.keys(stringsBySender).reduce(
    (obj, sender) => ({
      ...obj,
      [sender]: countWords(matchWords(stringsBySender[sender]))
    }),
    {}
  )
  console.log(JSON.stringify(wordCounts, null, pretty && 2))
}

getStdin()
  .then(JSON.parse)
  .then(processMessages)
