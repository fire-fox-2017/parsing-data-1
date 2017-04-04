"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,date){
    this.id = id
    this.fname = first_name
    this.lname = last_name
    this.email = email
    this.phone = phone
    this.date = new Date(date).toString()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    let file = fs.readFileSync(this._file, 'utf-8').split('\n').map((element)=>{return element.split(',')})
    for(let i=0; i<file.length; i++){
      if(i > 0){
        let getDate = new Date(file[i][5])
        file[i][5] = getDate.toString()
      }
    }
    this._people = file
    return file.length-1
  }

  addPerson(obj) {
    let addUser = []
    Object.keys(obj).forEach((element)=>{addUser.push(obj[element])})
    this._people.push(addUser)
    let push = this._people.join('\n')
    fs.writeFile(this._file, push, 'utf-8')
  }
}

let parser = new PersonParser('people.csv')
let newPerson = new Person("201","Paul","Chaisinami","Paulista@cloud.com","0889987654321","2017-03-21T23:00:29-10:00")

// console.log(newPerson);
console.log(`There are ${parser.people} people in the file '${parser._file}'.`)
// console.log(JSON.stringify(parser._people))
console.log('==============');
parser.addPerson(newPerson)

