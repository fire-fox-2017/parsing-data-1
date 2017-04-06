"use strict"

let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(profile) {
    this.id = profile.id;
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.email = profile.email;
    this.phone = profile.phone;
    this.createdAt = profile.createdAt || new Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = fs.readFileSync(this._file).toString().split("\n");
    this._newPeople = [];
  }

  get people() {
    return this._people
  }

  addPerson(profile) {
    let arrProfileData = [profile.id, profile.firstName, profile.lastName, profile.email, profile.phone, profile.createdAt];
    // let arrToString = arrProfileData.toString();
    this._newPeople.push(arrProfileData);
  }

  save() {
    let rawPeopleDataInArr = [];
    let newPeopleData = this._newPeople.join('\n');
    fs.writeFileSync(this._file, newPeopleData, 'utf-8')
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person({
  'id': '201',
  'firstName': 'Ahmad',
  'lastName': 'Doni',
  'email': 'ahmaddoni@gmail.com',
  'phone': '1-222-111-9991',
  'createdAt': '2012-06-18T15:32:40-07:00'
}))

// parser.save();
console.log(parser.people[parser.people.length - 1])
console.log(parser._newPeople.join('\n'))

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
