"use strict"
const fs = require ('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj){
    this._id = obj.id;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._email = obj.email;
    this._phone = obj.phone;
    this._createdAt = obj.createdAt;
  }
  get stringified(){
    return `${this._id},${this._firstName},${this._lastName},${this._email},${this._phone},${this._createdAt},`;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
  }

  get people() {
    let temp = fs.readFileSync(this._file).toString().split('\n');
    for(let i=0;i<temp.length;i++){
      this._people.push(temp[i]);
    }
    return this._people;
  }

  addPerson(obj) {
    let person = new Person(obj);
    this._people.push(person.stringified);
    //console.log(this._people);
  }

  save(){
    let temp = fs.writeFileSync(this._file,this._people.join('\n'));
  }

}


let object = {
  id : 201,
  firstName : 'Aldy',
  lastName : 'Andika',
  email : 'aldy.andika@gmail.com',
  phone : 0809183742,
  createdAt : new Date()
}

let parser = new PersonParser('people.csv');
parser.people;
parser.addPerson(object);
parser.save();

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
