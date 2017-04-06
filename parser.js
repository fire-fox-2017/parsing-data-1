"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._file = file
    this._people = []
  }

  getPeople() {
    const fs = require('fs');
    let file = fs.readFileSync(this._file,'utf-8')
    file = file.split("\n")
    for(let i=0;i<file.length;i++){
      file[i] = file[i].split(",")
    }
    for(let i=1;i<file.length;i++){
      var person = new Person(file[i][0],file[i][1],file[i][2],file[i][3],file[i][4],file[i][5])
      this._people.push(person);
    }
    return this._people
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    var person = new Person(id,first_name,last_name,email,phone,created_at)
    this._people.push(person)
  }

  save(){
    var data = `${this._people[this._people.length-1].id},${this._people[this._people.length-1].first_name},${this._people[this._people.length-1].last_name},${this._people[this._people.length-1].email},${this._people[this._people.length-1].phone},${this._people[this._people.length-1].created_at}`
    const fs = require('fs')
    fs.appendFileSync(this._file,data,'utf8')
  }

}
var dateFormat = require('dateformat');
var now = new Date();

let parser = new PersonParser('people.csv')
console.log(`There are ${parser._people.length-1}  people in the file '${parser._file}'.`)
parser.addPerson(201,"Dyan","Kastutara","dyankastutara19@gmail.com","0858555555555",dateFormat(now,"isoDateTime"));
parser.save();
console.log(parser.getPeople());
console.log(`There are ${parser._people.length-1}  people in the file '${parser._file}'.`)
