"use strict"

const fs = require('fs');

class Person {
  constructor(objekPerson){
    this.id = objekPerson.id;
    this.firstName = objekPerson.firstName;
    this.lastName = objekPerson.lastName;
    this.email = objekPerson.email;
    this.phone = objekPerson.phone;
    this.date = objekPerson.date;
  }

  get data(){
    return `${this.id}, ${this.firstName}, ${this.lastName}, ${this.email}, ${this.phone}, ${this.date}`
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    let file = fs.readFileSync(this._file, 'utf-8').split('\n');
    for(let i=0;i<file.length;i++){
      this._people.push(file[i])//.split(','))
    }
    return this._people;
  }

  addPerson(objekPerson) {
    let person = new Person(objekPerson);
    this._people.push(person.data);
  }

  saveFile(objekPerson){
    let person = new Person(objekPerson);
    fs.appendFileSync('people.csv', JSON.stringify(person))
    return `Selesai`
  }

  get size(){
    return this._people.length-1;
  }

}

let person = {
  'id' : 201,
  'firstName' : 'Oscar',
  'lastName' : 'Hermawan',
  'email' : 'franky1790@gmail.com',
  'phone' : '+62-857-37809-990',
  'date' : new Date().toISOString()
}


let parser = new PersonParser('people.csv')
console.log(parser.people);
parser.addPerson(person);
parser.saveFile(person);

console.log(`There are ${parser.size} people in the file'.`)