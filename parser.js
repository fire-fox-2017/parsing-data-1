"use strict"
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = new Set();
    let data = fs.readFileSync(this._file).toString();
    let parsedData = parse(data);
    for (let i = 1; i < parsedData.length; i++) {
      let person = new Person(parsedData[i][0],
                              parsedData[i][1],
                              parsedData[i][2],
                              parsedData[i][3],
                              parsedData[i][4],
                              parsedData[i][5],
                              parsedData[i][6]);
      this._people.add(person);
    }
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  addPerson(newPerson) {
    this._people.add(newPerson);
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.people);

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

let newPerson = new Person(201, "Entah", "Siapa", "entahsiapa@apalah.com",
                           "1-234-567-8910", Date());

parser.addPerson(newPerson);
console.log(parser.people);

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
