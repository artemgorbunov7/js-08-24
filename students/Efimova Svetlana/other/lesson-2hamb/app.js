const sizeParam = {
    big: { 
        price: 100,
        calories: 40,
    },
    small: { 
        price: 50,
        calories: 20,
    },
}

const stuffingParam = {
    cheese: { 
        price: 10,
        calories: 20,
    },
    salad: { 
        price: 20,
        calories: 5,
    },
    potato: { 
        price: 15,
        calories: 10,
    },
}

const toppingParam = {
    sauce: { 
        price: 15,
        calories: 0,
    },
    mayonnaise: { 
        price: 20,
        calories: 5,
    },
}

class Hamburger {
    constructor(size, stuffing, toppings) {
        //TODO добавить проверку на size и stuff
       this.size = size;
       this.stuffing = stuffing; 
       this.toppings = toppings;
    }
    addTopping(topping) {    // Добавить добавку 
    
    }
    removeTopping(topping) { // Убрать добавку 
    
    }
    getToppings(topping) {   // Получить список добавок 
    
    }
    getSize() {              // Узнать размер гамбургера 
    
    }
    getStuffing() {          // Узнать начинку гамбургера 
    
    }
    calculatePrice() {       // Узнать цену 
        let toppingPrice = 0;
        /* this.toppings.reduce((acc, curr) => {
            return toppingPrice = acc + curr.price;
        }, 0); */
        return sizeParam[this.size].price + stuffingParam[this.stuffing].price + toppingPrice;
    }
    calculateCalories() {    // Узнать калорийность 
        return sizeParam[this.size].calories + stuffingParam[this.stuffing].calories;
    }
}