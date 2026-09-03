const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kirinporsti_db_user:${password}@cluster0.lmnfaqk.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const run = async () => {
  await mongoose.connect(url, { family: 4 })

  if (name && number) {
    const person = new Person({ name, number })
    await person.save()
    console.log(`added ${name} number ${number} to phonebook`)
    return
  }

  if (!name && !number) {
    const persons = await Person.find({})
    console.log('phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    return
  }

  throw new Error('give both name and number, or only the password')
}

run()
  .catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
  .finally(() => mongoose.connection.close())
