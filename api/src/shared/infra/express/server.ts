import express from 'express'


const app = express()

const PORT = 5000


app.get('/', (_, response) => {
  return response.json({ message: 'Hello world' })
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
