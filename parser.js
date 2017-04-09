"use strict"
let fs = require('fs')

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(component) {
        this._id = component['id']
        this._first_name = component['first_name']
        this._last_name = component['last_name']
        this._email = component['email']
        this._phone = component['phone']
        this._created_at = component['created_at']
    }

    get dataPeople() {
        return `${this._id},${this._first_name},${this._last_name},${this._email},${this._phone},${this._created_at}`;
    }

}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = []
    }

    get people() {
        let data_csv = fs.readFileSync(this._file).toString().split("\n")
        for (let i = 0; i < data_csv.length; i++) {
            this._people.push(data_csv[i])
        }
        return this._people
    }

    addPerson(objPerson) {
        let person = new Person(objPerson)
        this._people.push(person.dataPeople)
    }

    save() {
        let saveFile = fs.writeFileSync(this._file, this._people.join('\n'))
        return saveFile
    }
}

let object = {
    id: 201,
    first_name: 'Uci',
    last_name: 'Lubis',
    email: 'arahitolubis@gmail.com',
    phone: '454-5343',
    created_at: new Date()
}

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson(object)
parser.save()

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
