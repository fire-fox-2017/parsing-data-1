"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._people = [];
  }

  getPeople() {
    const fs = require('fs')
    var list = fs.readFileSync(this._file, 'utf8')
    list = list.split("\n")
    for(let i = 0; i < list.length ; i++){
      list[i] = list[i].split(",");
    }
    for (let i=1; i<list.length; i++){
      var date = new Date(list[i][5])
      var person=new Person(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4], date.toUTCString());
      this._people.push(person);
    }
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    var person = new Person(id, first_name, last_name, email, phone, created_at)
    this._people.push(person);
  }

  save(){
    var str = `\n${this._people[this._people.length-1].id},${this._people[this._people.length-1].first_name},${this._people[this._people.length-1].last_name},${this._people[this._people.length-1].email},${this._people[this._people.length-1].phone},${this._people[this._people.length-1].created_at}`
    const fs = require('fs')
    fs.appendFileSync('people.csv',str,'utf8')
  }
}

//driver's code
let parser = new PersonParser('people.csv')
console.log(parser.getPeople())
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
parser.addPerson(201,'Bill', 'Koo', 'bill@gmail.com', 087781024, 'now' )
parser.save()
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
