"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  // id,first_name,last_name,email,phone,created_at
  // 1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00

  constructor (param) {
    this._id = param['id'];
    this._first_name = param['first_name'];
    this._last_name = param['last_name'];
    this._email = param['email'];
    this._phone = param['phone'];
    this._created_at = param['created_at'];
  }

}


/*

questions
baca file kapan? di constructor?


*/
var fs = require('fs');
class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

  //   this._data = fs.readFileSync(this._file)
  // .toString()
  // .split("\n");

    // fill up _people


  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  loadPeople() {
      let data = fs.readFileSync(this._file)
    .toString()
    .split("\n");

    console.log(data);
    let key = data[0].split(',');
    console.log(key);
    console.log(key[0]);

    for (let i = 1 ; i < data.length ; i++) {
      let value = data[i].split(',');
      // id,first_name,last_name,email,phone,created_at

      // let person = new Person({ 'id': value[0], key[1]: value[1], key[2]: value[2], key[3]: value[3], key[4]: value[4], key[5]: value[5] });


      let person = new Person({ id: value[0], first_name: value[1], last_name: value[2], email: value[3], phone: value[4], created_at: Date.parse(value[5]) });
      this._people.push(person);
    }


  }

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    let str = "id,first_name,last_name,email,phone,created_at\n";
    fs.writeFileSync('test.csv', str);

    for (let i = 0 ; i < this._people.length ; i++) {
      // for ( prop in this._people[i]) {
      //   str += this._people[i][prop] + ","
      // }
      // why this is not working

      str = `${this._people[i]['_id']},${this._people[i]['_first_name']}, ${this._people[i]['_last_name']}, ${this._people[i]['_email']}, ${this._people[i]['_phone']}, ${new  Date (this._people[i]['_created_at'])}\n`;
      // console.log(str);
      fs.writeFileSync('test.csv', str, {flag: "a"});

    }

  }

}

let parser = new PersonParser('people.csv')
console.log(parser.loadPeople());


console.log(parser.people);
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

parser.addPerson(new Person({ id: 300, first_name: 'rudy', last_name: 'wahjudi', email: 'rudy@haha.com', phone: '123-12222', created_at: Date.now() }))

parser.save();
