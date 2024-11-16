const fs = require('fs')
const { Transform } = require('stream')

function processData(inputFilePath, outputFilePath) {
  // Implement this function
  const readableStream = fs.createReadStream(inputFilePath, {
    encoding: 'utf-8',
  })

  const writableStream = fs.createWriteStream(outputFilePath)

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      try {
        const processedChunk = chunk.toUpperCase()
        callback(null, processedChunk)
      } catch (error) {
        callback(error)
      }
    },
  })

  readableStream.on('error', (err) => console.log(err))
  writableStream.on('error', (err) => console.log(err))
  transformStream.on('error', (err) => console.log(err))

  readableStream.pipe(transformStream).pipe(writableStream)

  writableStream.on('finish', () => {
    console.log('Data processing complete. Output written to', outputFilePath)
  })
}

processData('input.txt', 'output.txt')
