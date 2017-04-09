"use strict"

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(obj) {
        this.id = obj['id'];
        this.firstName = obj['firstName'];
        this.lastName = obj['lastName'];
        this.email = obj['email'];
        this.phone = obj['phone'];
        this.createdAt = obj['createdAt'];
    }

}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = [];
        this._fs = require('fs');
    }

    get people() {
        this._people = [];
        let data = [];
        let file = this._fs.readFileSync(this._file, 'utf-8').split('\n');
        for (let i = 0; i < file.length; i++) {
            data[i] = file[i].split(',');
        }
        for (let i = 1; i < file.length; i++) {
            let date = new Date(data[i][5]);
            let person = new Person({
                id: data[i][0],
                firstName: data[i][1],
                lastName: data[i][2],
                email: data[i][3],
                phone: data[i][4],
                createdAt: date.toUTCString()
            });
            this._people.push(person);
        }

        return this._people;
    }

    get size() {
        return this._people.length - 1;

    }

    addPerson(obj) {
        // console.log(this._people.length);
        let date = new Date(obj['createdAt']);
        obj['createdAt'] = date;
        this._people.push(obj);
        console.log(this._people[201]);
    }

    save() {
        let datapeople = this._people.length - 1;
        let saveperson = `${this._people[datapeople].id},${this._people[datapeople].firstName},${this._people[datapeople].lastName},${this._people[datapeople].email},${this._people[datapeople].phone},${this._people[datapeople].createdAt}\n`;

      this._fs.appendFileSync('people.csv', saveperson);
    }

};

let parser = new PersonParser('people.csv');
console.log(parser.people);
// console.log(`There are ${parser.size} people in the file '${parser._file}'.`)

let newperson = new Person({
    id: '201',
    firstName: 'Ambo',
    lastName: 'Dalle',
    email: 'ambodalle.st@gmail.com',
    phone: '0217327432',
    createdAt: '2017-04-22:09:03-08:00'
});

console.log("---------------------------------------------------------------");
parser.addPerson(newperson)
  // console.log(newperson);
parser.save();
console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
