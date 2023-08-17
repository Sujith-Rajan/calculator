class Calculator{
    constructor( firstoperationStore,presentOperationStore){
        this.firstoperationStore =firstoperationStore;
        this.presentOperationStore = presentOperationStore;
        this.clear()
    }
     
         clear() {
        this.presentOperand = "";
        this.firstOperand = "";
        this.operation = undefined;
        
    }

      attachNumberToConsole(passedNumber){

        if(passedNumber === '.' && this.presentOperand.includes('.') )
        return;
        this.presentOperand = this.presentOperand.toString() + passedNumber.toString();

    }
    getOperationValuesForDisplay(passedNumber){
        const stringNumber = passedNumber.toString();
        const integerPart = parseFloat(stringNumber.split('.')[0]);
        const decimalPart = stringNumber.split('.')[1];
        let integerShow;
        if(isNaN(integerPart)){
            integerShow = "";
        }
        else{
            integerShow = integerPart.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalPart != null){
            return `${integerShow}.${decimalPart}`;
            
        }
        else{
            return integerShow;
        }

    }

    printOutputToDisplay(){
        this.presentOperationStore.innerText = this.getOperationValuesForDisplay(this.presentOperand);
        if(this.operation != null){
            this.firstoperationStore.innerText = `${this.getOperationValuesForDisplay(this.firstOperand)} ${this.operation}`;
        }
        else{
            this.firstoperationStore.innerText ="";
        }
    }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector("#c");
const resetButton = document.querySelector("#ac");
const equalTo = document.querySelector("#equal");
const firstoperationStore= document.querySelector(".first-operation");
const presentOperationStore = document.querySelector(".present-operation");

const calculator = new Calculator( firstoperationStore,presentOperationStore)

numberButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        calculator.attachNumberToConsole(button.innerText)
        calculator.printOutputToDisplay();
    });
});