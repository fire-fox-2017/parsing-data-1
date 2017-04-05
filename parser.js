"use strict"

const fs = require('fs');

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(id, first_name, last_name, email, phone, created_at) {
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._phone = phone;
        this._created_at = created_at;
    }
}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = [];
    }

    get people() {
        let data = [];
        let file = fs.readFileSync(this._file, 'utf-8').split('\n'); //split isi array jadi per baris

        for (var i = 0; i < file.length; i++) {
            data[i] = file[i].split(','); //split isi array file, masukkan ke data, jadi array 2 dimensi
        }

        for (let i=1; i<file.length; i++){ //membuat array of object
          var date = new Date(data[i][5]);
          var person = new Person(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], date);
          this._people.push(person);
        }

        return this._people;

    }

    addPerson(id, first_name, last_name, email, phone, created_at) {
        let person1 = new Person(id, first_name, last_name, email, phone, created_at);
        this._people.push(person1);
    }

    save() {
        let jumlahOrang = this._people.length;
        let str = `${this._people[jumlahOrang-1]._id},${this._people[jumlahOrang-1]._first_name},${this._people[jumlahOrang-1]._last_name},${this._people[jumlahOrang-1]._email},${this._people[jumlahOrang-1]._phone},${this._people[jumlahOrang-1]._created_at}\n`;
        fs.appendFileSync('people.csv', str);
    }

    get size() {
        return this._people.length;
    }

}

let parser = new PersonParser('people.csv');

let persona = ['301','Ilham','H','ilham@mail.com','0327327238','2012-02-29T23:34:35-08:00'];
parser.addPerson(persona);
console.log(parser.people);

console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
