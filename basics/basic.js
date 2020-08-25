console.log("This is not an inline script but an external file")

// declaring a variable

var firstName = 'Yeshas'
var secondName = 'Yesodharan'



// data types in javascript
// 1. Number: all numbers are floating point numbers, for decimal and integers
var age = 27

// 2. String: Sequence of characters used for text
// see line 5 n 6

// 3. Boolean: Logical data type true or false
var fullAge = true
//console.log(fullAge)

// 4. Undefined: data type of a variable that doesnt have a value yet or say means non existent
// 5. Null: Also means non Existent
var job
//console.log(job)

job = "Engineer"
//console.log("He works as an " + job)

// JS has dynamic typing  
// variable mutation and type coercion
// + sign concatenates 2 strings 
console.log('This program is created by ' + firstName + " " + secondName)
console.log(firstName + " " + secondName + " is " + age + " years old and he works as " + job + ". is he Married? " + false)

// Show an alert - Alert is a pop up or notification. Page cannot do anything else unless as alert is closed
alert("This is an alert! You cannot proceed without closing me")

//Show a prompt - A prompt is a pop up that asks user to enter a data 
var userReview = prompt("Are you enjoying the JS tutorials ?")
console.log("is the user enjoying the JS tutorials ? " + userReview)

// Basic Operators in JS
year = 2020
var dob = year - age
console.log(firstName + " was born in " + dob)

var ageRaju = 28
var dobraju = year - ageRaju
console.log("Raju was born in " + dobraju)

console.log("Add 2 to age " + (age + 2))
console.log("Multiply age by 2 " + (age * 2))
console.log("Is yeshas older than raju ?" + (age > ageRaju))

console.log(typeof age)
console.log(typeof firstName)
console.log(typeof raju)

// operator precedence

var whatAge = year - age >= ageRaju
console.log(whatAge) // doesnt makes sense as raju is older

var whatAge = year - (age >= ageRaju)
console.log(whatAge) // makes sense as raju is older

// arrays in javascript

var firstNames = ['john', 'mark', 'peter'] 
var secondNames = new Array('conor', 'hamil', 'parker')
var yearOfBirth = []
for(i = 0; i < firstNames.length; i++)
{
    console.log(firstNames[i], secondNames[i])
}

// add element to end of the array
yearOfBirth.push(1990, 1995, 1998)
console.log(yearOfBirth.toString())

// add element to begining of array
firstNames.unshift("heros")
console.log(firstNames.toString())

// remove elemnet from start fo the array
firstNames.shift()
console.log(firstNames.toString())

// remove element from end of array
yearOfBirth.pop()
console.log(yearOfBirth.toString())

// objects and properties

var yeshas = {
    firstname : "yeshas",
    secondName : "yesodharan",
    birthYear : 1993,
    job  :'Engineer',
    family : ['Mom', 'Dad', 'Brother'],
    calculateAge : function(birthYear)
    {
        return 2020 - birthYear
    },
    getJob : function()
    {
        return this.job
    },
    calculateAgeBetterWay : function()
    {
        return this.age = 2021 - this.birthYear
    }
}


console.log(yeshas)
console.log(yeshas['firstName'])
console.log(yeshas.calculateAge(yeshas.birthYear))
console.log(yeshas.getJob())
console.log(yeshas.calculateAgeBetterWay(), yeshas)