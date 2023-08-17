class Calculator {
    constructor(firstoperationStore, presentOperationStore) {
        this.firstoperationStore = firstoperationStore;
        this.presentOperationStore = presentOperationStore;
        this.clear();
    }

    clear() {
        this.presentOperand = "";
        this.firstOperand = "";
        this.operation = undefined;
    }

    attachNumberToConsole(passedNumber) {
        if (passedNumber === "." && this.presentOperand.includes(".")) return;
        this.presentOperand = this.presentOperand.toString() + passedNumber.toString();
    }
    attachOperatorToConsole(passedOperator) {
        if (this.presentOperand === "") return;
        if (this.firstOperand != "") {
            this.calculation();
        }
        this.operation = passedOperator;
        this.firstOperand = this.presentOperand;
        this.presentOperand = "";
    }
    calculation() {
        let calculate;
        const first = parseFloat(this.firstOperand);
        const present = parseFloat(this.presentOperand);
        if (isNaN(first) || isNaN(present)) return;
        switch (this.operation) {
            case "+":
                calculate = first + present;

                break;
            case "-":
                calculate = first - present;
                break;
            case "*":
                calculate = first * present;
                break;
            case "/":
                calculate = first / present;
                break;
            case "%":
                calculate = first * (present / 100);
                break;
            default:
                return;
        }
        this.presentOperand = calculate;
        this.operation = undefined;
        this.firstOperand = "";
    }
    getOperationValuesForDisplay(passedNumber) {
        const stringNumber = passedNumber.toString();
        const integerPart = parseFloat(stringNumber.split(".")[0]);
        const decimalPart = stringNumber.split(".")[1];
        let integerShow;
        if (isNaN(integerPart)) {
            integerShow = "";
        } else {
            integerShow = integerPart.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalPart != null) {
            return `${integerShow}.${decimalPart}`;
        } else {
            return integerShow;
        }
    }

    printOutputToDisplay() {
        this.presentOperationStore.innerText = this.getOperationValuesForDisplay(this.presentOperand);
        if (this.operation != null) {
            this.firstoperationStore.innerText = `${this.getOperationValuesForDisplay(this.firstOperand)} ${
                this.operation
            }`;
        } else {
            this.firstoperationStore.innerText = "";
        }
       
    }
    delete() {
        this.presentOperand = this.presentOperand.toString().slice(0, -1);
    }
   
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector("#c");
const backSpace = document.querySelector("#ac");
const equalTo = document.querySelector('#equal');
const firstoperationStore = document.querySelector(".first-operation");
const presentOperationStore = document.querySelector(".present-operation");

const calculator = new Calculator(firstoperationStore, presentOperationStore);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.attachNumberToConsole(button.innerText);
        calculator.printOutputToDisplay();
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.attachOperatorToConsole(button.innerText);
        calculator.printOutputToDisplay();
    });
});

equalTo.addEventListener("click", (button) => {
    calculator.calculation();
   
    calculator.printOutputToDisplay();
});
clearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.printOutputToDisplay();
});
backSpace.addEventListener("click", (button) => {
    calculator.delete();
    calculator.printOutputToDisplay();
});
