"use strict"
const fs = require("fs")
//var csv = require("fast-csv");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data){
    this.id = data.id
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.email = data.email
    this.phone = data.phone
    this.created_at = data.created_at
    //new Date().toISOString()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let data_csv = fs.readFileSync(this._file, 'utf-8').split("\n")
    let data_person;
      for(let i =1; i<data_csv.length; i++){
        data_person = data_csv[i].split(",")
        this._people.push(new Person({id : data_person[0], first_name : data_person[1], last_name : data_person[2], email : data_person[3], phone : data_person[4], created_at : data_person[5]}))
      }
      //console.log(this._people)
  }

  addPerson(data) {
    this._people.push(new Person({id : this._people.length+1, first_name : data.first_name, last_name : data.last_name, email : data.email, phone : data.phone, created_at : data.created_at}))
  }

  save(){
    for(let i=0; i<this._people.length; i++){
       this._people[i] = `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
    }
    let dataCSV = "id,first_name,last_name,email,phone,created_at\n"
    dataCSV += this._people.join('\n')
    console.log(dataCSV)
    fs.writeFile(this._file, dataCSV, 'utf-8', (err, data)=>{
      if(!err){
        return data
      }else{
        console.log(err.message)
      }
    })
   }
}

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson({"first_name" : 'Edim', "last_name" : 'Dendy', "email" : 'edim@gmail.com', "phone" : 085794279912, "created_at" : new Date().toISOString()})
parser.save()

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
