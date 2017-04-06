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
    this._parsedData = parse(data);
    for (let i = 1; i < this._parsedData.length; i++) {
      let person = new Person(this._parsedData[i][0],
                              this._parsedData[i][1],
                              this._parsedData[i][2],
                              this._parsedData[i][3],
                              this._parsedData[i][4],
                              this._parsedData[i][5],
                              this._parsedData[i][6]);
      this._people.add(person);
    }
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  addPersonToParsed(newPerson) {
    let newPersonKeys = Object.keys(newPerson);
    let newPersonArr = [];
    for (let i = 0; i < newPersonKeys.length; i++) {
      newPersonArr.push(newPerson[newPersonKeys[i]]);
    }
    this._parsedData.push(newPersonArr);
  }

  convertTocsv(data) {
    let stringArr = [];
    for (let i = 0; i < data.length; i++) {
      stringArr.push(data[i].join(","));
    }
    let csvString = stringArr.join("\n");
    return csvString;
  }

  writeFile() {
    fs.writeFileSync(this.file, this.convertTocsv(this._parsedData));
  }

  addPerson(newPerson) {
    this._people.add(newPerson);
    this.addPersonToParsed(newPerson);
    this.writeFile();
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.people);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

let newPerson = new Person(201, "Entah", "Siapa", "entahsiapa@apalah.com",
                           "1-234-567-8910", Date());

// parser.addPerson(newPerson);
// console.log(parser.people);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
