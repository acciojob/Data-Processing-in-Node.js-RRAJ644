//Implement the processData function in app.js:

const fs = require('fs')
const { Transform } = require('stream')

function processData(inputFilePath, outputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' })

  const writeStream = fs.createWriteStream(outputFilePath)

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const transformedChunk = chunk.toString().toUpperCase()
      this.push(transformedChunk)
      callback()
    },
  })
  readStream.pipe(transformStream).pipe(writeStream)

  readStream.on('error', (err) => {
    console.error('Error reading the file:', err)
  })

  writeStream.on('error', (err) => {
    console.error('Error writing to the file:', err)
  })

  writeStream.on('finish', () => {
    console.log('Data processing and writing to file completed.')
  })
}

processData('input.txt', 'output.txt')
