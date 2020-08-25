// Budget Controller
var budgetController = (function(){
    var Expense  = function(id, descr, value)
    {
        this.id = id
        this.descr = descr
        this.value = value
    }

     var Income = function(id, descr, value)
    {
        this.id = id
        this.descr = descr
        this.value = value
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            totalExpenses: 0,
            totalIncomes: 0
        },
        budget: 0,
        percentageIncome: 0
    }
    calculateTotal =  function(type){
        var sum = 0
        data.allItems[type].forEach(function(current){
            sum += current.value
        })
        if(type === 'inc')
        {
            data.totals.totalIncomes = sum
        }
        else if(type === 'exp')
        {
            data.totals.totalExpenses = sum
        }
    }

    return {
        addItem : function(type, descr, value)
        {
            var newItem 
            var id = 0
            var valIndex = 0
            data.allItems[type].length === 0 ? id = 0 : id = data.allItems[type][data.allItems[type].length - 1].id + 1
            // If the new item is of type expense
            if(type === 'exp' )
            {
                newItem = new Expense(id, descr, value)
            }
            // If the new item is of type income
            else if(type === 'inc')
            {
                newItem = new Income(id, descr, value)
            }
            // add item to the data strcuture for incomes and expense
            data.allItems[type].push(newItem)
            return newItem
        },
        calculateBudget: function(){
            // calculate total income and expenses 
            calculateTotal("inc")
            calculateTotal("exp")
            console.log("total income: " + data.totals.totalIncomes + " total expense : " + data.totals.totalExpenses)
            
            // calculate budget income - expenses
            data.budget = data.totals.totalIncomes - data.totals.totalExpenses
            console.log("total budget: " + data.budget)
            // calculate percentages of income that we spent
            if(data.totals.totalIncomes > 0)
            {
                data.percentageIncome = Math.round((data.totals.totalExpenses / data.totals.totalIncomes) * 100)
                console.log("Percentage of income spent: " + data.percentageIncome)
            }
            else
            {
                data.percentageIncome = -1
            }
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.totalIncomes,
                totalExp: data.totals.totalExpenses,
                percentageInc: data.percentageIncome
            }
        },
    

        testing : function()
        {
            console.log(data.allItems.exp, data.allItems.inc)
        }
    }

}());

// IU Controller
var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        addBtn:     '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'

    }
    return {
        getInput: function(){
            return {
            type : document.querySelector(DOMStrings.inputType).value,
            description : document.querySelector(DOMStrings.inputDesc).value,
            value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }     
        },

        getDOMStrings: function(){
            return DOMStrings
        },

        addListitem : function(obj, type){
            // add html stirngs with placeholder texts
            if(type === 'inc')
            {
                element = DOMStrings.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix">\
                <div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn">\
                <i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type === 'exp')
            {
                element = DOMStrings.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>\
                <div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div>\
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                    </div></div></div>'
            }
            // replace the placeholder with the actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.descr)
            newHtml = newHtml.replace('%value%', obj.value)
            // insert the html string into the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields: function(){
            var fields
            fields = document.querySelectorAll(DOMStrings.inputDesc + ', ' + DOMStrings.inputValue)
            fieldsArray = Array.prototype.slice.call(fields)

            fieldsArray.forEach(function(current, index, array) {
                current.value = ""
            });
            fieldsArray[0].focus()
        },

        displayBudget: function(obj){
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp
            if(obj.percentageInc > 0)
            {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentageInc + '%'
            }
            else
            {
                document.querySelector(DOMStrings.percentageLabel).textContent = 0 + '%'
            }
        }
    }
}())

// Global App Controller
var controller = (function(budgetCtrl, UICtrl)
{
    var DOMStirngs = UICtrl.getDOMStrings()

    var setUpEventListeners = function(){
        document.querySelector(DOMStirngs.addBtn).addEventListener('click', ctrlAddItem)
        // key press event for enter key
        document.addEventListener("keypress", function(event){
            if(event.key === "Enter" || event.keycode === 13 || event.which === 13)
            {
                console.log("Enter key has been pressed")
                ctrlAddItem()
            }
        })
    }

    var updateBudget = function(){
        // 1. Calculate the budget
        budgetController.calculateBudget()

        // 2. Return the budget
        budgetData = budgetController.getBudget()
        console.log(budgetData)

        // 3. Display the budget on UI
        UICtrl.displayBudget(budgetData)
    }
    var ctrlAddItem = function(){
        console.log("Adding Item to Budget")
        // 1. get the field
        var input = UICtrl.getInput()
        console.log(input)

        if(input.description !== "" &&  !isNaN(input.value) && input.value > 0 )
        {
            // 2. add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            // 3. add item to UI
            UICtrl.addListitem(newItem, input.type)

            // 4. Clear the fields
            UICtrl.clearFields()

            // 5. Calculate the budget 
            updateBudget()
            // 6. Display the budget

        }
    }

    return {
        init: function()
        {
            console.log('Application has started')
            setUpEventListeners()
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentageInc: 0
            })
        }
    }
   
}(budgetController, UIController))

controller.init()