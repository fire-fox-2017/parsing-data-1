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
    this.createdAt = profile.createdAt || new Date().toISOString();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }
  
  // get people() sebagai read data people.csv
  get people() {
    let csvInArr = fs.readFileSync(this._file, 'utf-8').split("\n"); //arr of str
    let personData; // idx arr => tiap property Person
    for(let i = 1; i < csvInArr.length; i++) {
      personData = csvInArr[i].split(',');
      this._people.push(new Person({
        'id': personData[0], 
        'firstName': personData[1], 
        'lastName': personData[2], 
        'email': personData[3], 
        'phone': personData[4], 
        'createdAt': personData[5]
      }));
      // this._people => arr of obj Person
    }
  }
  
  addPerson(personData) {
    this._people.push(new Person({
      'id': this._people.length + 1,
      'firstName': personData.firstName,
      'lastName': personData.lastName,
      'email': personData.email,
      'phone': personData.phone,
      'createdAt': personData.createdAt
    }))
  }

  save() {

    // this._people yg obj of Person jadiin string disini ya
    for(let i = 0; i < this._people.length; i++) {
      this._people[i] = `${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`;
    }

    // csv data beres
    let csvWithRowName = "id,first_name,last_name,email,phone,created_at\n";
    csvWithRowName += this._people.join('\n')

    // data yg beres di write
    fs.writeFile(this._file, csvWithRowName, 'utf-8', (err, data) => {
      if(!err) {
        return data;
      } else {
        console.log(err.message);
      }
    });
  }

}

let parser = new PersonParser('people.csv');

parser.people

parser.addPerson(new Person({
  'id': '201',
  'firstName': 'Ahmad',
  'lastName': 'Doni',
  'email': 'ahmaddoni@gmail.com',
  'phone': '1-222-111-9991',
}))

parser.addPerson(new Person({
  'id': '202',
  'firstName': 'Mark',
  'lastName': 'Doni',
  'email': 'mark@gmail.com',
  'phone': '1-102-238-1282',
}))

parser.save();





console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
