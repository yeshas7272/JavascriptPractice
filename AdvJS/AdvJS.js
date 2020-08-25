//  We earlier said that everything in JS is an object. Well no teverything is an object
//  the primitive data types (Numbers, Strings, Booleans, undefined, NULL) are not objects
//  Everything else (Arrays, Functions, Objects, Dates, wrapper for numbers and strings) is an object.
//  Every JS object has a protytpe property which makes inhertence possible in JS
//  The prototype property of an object is where we put all the methods and properties that we want
//  other objects to inherit
//  The constructor's prototype property is not the prototype of the constructor itself, it is the property
//  of all the insatnces created through it
//  When a certain method or property is called the search begins in the object itself and if it is not found
//  the search moves on to the object's prototype. This continues untill the method is found: PROTOTYPE CHAIN 

// An example object
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'Teacher'
}

// Function Constructor
var Person = function(name, yearOfBirth, job){
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
    this.toString = function(){
        return this.name + " was born in the year " + this.yearOfBirth + " and works as a " + this.job
    }
    this.calculateAge = function(){
        return 2020 - this.yearOfBirth
    }
}

Person.prototype.lastName = "Smith"
Person.prototype.hobby = "Bowling"
var mary = new Person("mary", 1992, "lawyer")
var alice = new Person("alice", 1969, "designer")
var bob = new Person("bob", 1961, "retired")
console.log(mary.toString())
console.log(alice.toString())
console.log(bob.toString())
console.log(mary.calculateAge())
console.log(mary.lastName)
console.log(alice.lastName)
console.log(bob.lastName)

mary.lastName = "williams"
console.log(mary.lastName)
console.log(alice.lastName)
console.log(bob.lastName)

Person.prototype.lastName = "williams"
console.log(mary.lastName)
console.log(alice.lastName)
console.log(bob.lastName)

console.log(mary.hobby)
console.log(alice.hobby)
console.log(bob.hobby)

console.log(mary)
// Creating objects using Object.Create
var personPrototype = {
    calculateAge: function(){
        console.log(2020 - this.yearOfBirth)
    }
}

var scott = Object.create(personPrototype)
scott.name = "scott"
scott.yearOfBirth = 1995
scott.job = "teacher"

var lisa = Object.create(personPrototype, 
    {
        name : {value: 'lisa'},
        yearOfBirth : {value: 1996},
        job : {value: 'editor'}

    })

// Primitives vs Objects
// primitives store the data in the var itself
// Objects do not store the object data in the variable instead
// the variable has a refernce to the object in memory

var a = 23
var b = a
var a = 32 

console.log(a, b) // you can see changing a doesnt chaneg b, hence primitves do not store a refernce but the data itself

var obj1 = {
    name: 'John',
    age: 30,
    job: "janitor"
}

var obj2 = obj1
obj1.age = 32
console.log(obj1.age, obj2.age)// you can see changing the age of obj1 changes the age of obj2 also as the refernce to same object is stored in both the variables

// Passing fucntions as arguements

var years = [1990, 1982, 1962, 2012, 2005]

function calcAge(year)
{
    return 2020 - year
}
function arrCal(arr, fn)
{
    var arrRes = []
    for(var i=0; i< arr.length; i++)
    {
        arrRes.push(fn(arr[i]))
    }
    return arrRes
}
function fullAge(year)
{
    var age = 2020 - year
    if(age > 30) return true
    else return false
}
resArr = arrCal(years, calcAge)
isFullAge = arrCal(years, fullAge)
console.log(resArr)
console.log(isFullAge)

// returning function from a function

function askAQuestion(gender){
    if(gender == 'male'){
        return function(name){
        console.log(name + ' is a ' + gender)
        }
    }else if(gender === 'female'){
        return function(name){
        console.log(name + " is a " + gender)
        }
    }
}

var questionToBoy = askAQuestion("male")
var questionToGirl = askAQuestion('female')
questionToBoy('john');
questionToGirl('lisa');

// Immediately Invoked Function Expressions IIFE

// Normal Implememtation
/*function game(){
    var score = Math.random() * 10
    console.log(score >= 10)
}*/

// IIFE implementation
(function() {
    var score = Math.random() * 10
    console.log("IIFE Code says: " + score >= 10)
})();

// Closures
// An inner fucntion has always access to the variables of the outer function
// even after the outer function has stopped its execution

function retirement(retirementAge){
    var stringToPrint = "Year left after retiremnet: " 
    return function(yearOfBirth){
        var age = 2020 - yearOfBirth
        console.log(stringToPrint + (retirementAge - age) )
    }
}

var retirementInUS = retirement(66)
var retirementInIND = retirement(65)

console.log(retirementInUS)
retirementInUS(1993)
retirementInIND(1993)

// Bind call and apply

var john = {
    name: 'john',
    age: 30,
    job: 'engineer',
    introduce: function(timeOfDay){
        console.log("Hi Good " +timeOfDay +  " I\'m " + this.name + " and I\'m " + this.age + " years old and work as " + this.job)
    }
}

john.introduce("morning")

var mary = {
    name: 'mary',
    age: 25,
    job: 'nurse'
}

john.introduce.call(mary, "Afternoon")

//john.introduce.apply(mary, ["Afternoon"]) // used to pass when teh required element is an array

var johnEvening = john.introduce.bind(john, "Evening")
var maryNight = john.introduce.bind(mary, "Night")

johnEvening()
maryNight()
