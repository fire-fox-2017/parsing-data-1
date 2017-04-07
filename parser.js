"use strict"
let fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(component){
    this.id = component['id']
    this.first_name = component['first_name']
    this.last_name = component['last_name']
    this.email = component['email']
    this.phone  = component['phone']
    this.created_at = component['created_at']
  }

  get data() {
    return `${this.id},${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let data = fs.readFileSync(this._file, "utf-8").split('\n')
    // this.people = []
    for (let i = 0; i < data.length; i++) {
      this._people.push(data[i].split(","))
    }
    // console.log(this._people);
    return this._people
  }

  get size() {
    return this._people.length
  }

  addPerson(obj) {
    let addPerson = new Person(obj)
    this._people.push(addPerson.data)
    return addPerson.data
  }

  saveFile(){
    let people = this._people.join('\n')
    fs.writeFileSync(this._file, people, "utf-8")
    return `data berhasil di parse`
  }
}

let parser = new PersonParser('people.csv')

let person1 = {
  'id' : 201,
  'first_name': "Budi",
  'last_name': "anduk",
  'email': "ga_ada@email.kok",
  'phone': 081234567,
  'created_at': new Date().toISOString()
}
// parser.people
console.log(parser.people);
console.log(parser.addPerson(person1));
console.log(parser.saveFile());
console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
