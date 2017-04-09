"use strict"
const fs = require("fs")

class Person {
    constructor(components){
  this.id = components.id
  this.first_name = components.first_name
  this.email = components.email
  this.phone = components.phone
  this.date = components.date
  }

get data(){
  return `${this.id} + ${this.first_name} + ${this.email} + ${this.phone} + ${this.date}`
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let file = fs.readFileSync(this._file,"utf-8").split(`\n`)
    for (let i = 0; i < file.length; i++){
      this._people.push(file[i])
    }
    return this._people
  }

  addPerson(ObjectPerson) {
    let person = new Person(ObjectPerson)
    this._people.push(person.data);
  }

  saveFile(ObjectPerson){
    let person = new Person(ObjectPerson)
    fs.appendFileSync("people.csv",JSON.stringify(person))
    return 'Selesai'
  }

  get size(){
    return this._people.length -1
  }
}

let PersonTest = {
  'id' : 201,
  'firstName' : 'Stedy',
  'lastName' : 'Yulius',
  'email' : 'stedyyulius@gmail.com',
  'phone' : '087878559222',
  'date' : new Date().toISOString()
}

let parser = new PersonParser('people.csv')
console.log(parser.people);
parser.addPerson(PersonTest);
parser.saveFile(PersonTest)

console.log(`There are ${parser.size} people in the file`)
