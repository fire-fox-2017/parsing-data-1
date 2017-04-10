"use strict"
const fs = require('fs');
class Person {
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
        this._file = file
        this._size = 0;
        this._people = fs.readFileSync(file).toString().split("\n");
        this._objPeople = []
    }

    get peopleLength() {
        return this._people.length
    }

    parsingtoObject() {
        let test;
        for (let i = 0; i < this._people.length-1; i++) {
            test = this._people[i].split(',');
            this.addPerson(new Person(test[0], test[1], test[2], test[3], test[4], test[5]))
        }
        console.log(this._objPeople);
    }

    size() {
        this.size = this._people.length;
        return this.size
    }


    save() {
    console.log(this._objPeople[200]);
        fs.writeFile('people.csv', this._objPeople.join('\n'), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }


    get file() {
        return this._file
    }
    addPerson(obj) {
        this._objPeople.push(`${obj.id},${obj.first_name},${obj.last_name},${obj.email},${obj.phone},${obj.created_at}`)
    }
}

let parser = new PersonParser('people.csv')
parser.parsingtoObject();



//
console.log(`There are ${parser.peopleLength} people in the file '${parser.file}'.`)
parser.addPerson(new Person('202', 'WISNU', 'Habsibi', 'ivanhabi2@gmail.com', '081321450548', '2012-05-10T03:53:40-07:00'));
parser.save();
