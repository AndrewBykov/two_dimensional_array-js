const inputBeginArray = document.querySelector('#input-a')
const inputEndArray = document.querySelector('#input-b')
const inputTableBox = document.querySelector('.box__inputs')
const boxInputsTable = document.querySelector('.box__inputs-table')
const tableInputs = document.querySelector('#created-inputs')
const error = document.querySelector('#error')

const btnCreateTable = document.querySelector('#btn')
const btnCreateArrayDouble = document.querySelector('#btn-create-array')

btnCreateTable.addEventListener('click', createTables)
btnCreateArrayDouble.addEventListener('click', getMatrixValues)

function createTables() {
  const a = +inputBeginArray.value
  const b = +inputEndArray.value

  const num1 = a
  const num2 = b

  if (num1 == '' || num2 == '') {
    error.innerText = `Введите поля ввода.`
    if (!inputTableBox.classList.contains('hide-table')) {
      inputTableBox.classList.add('hide-table')
    }
    error.classList.remove('hide-error')
    return
  }

  if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
    error.innerText = `Извините, числа a и b должно быть целым, а не десятичными.`
    error.classList.remove('hide-error')
    return
  } 

  let sum = a * b
  

  if (!Number.isInteger(Math.sqrt(sum))) {
    error.innerText = `Извините, но ваше выражение "${num1} * ${num2}" не подходит, потому что двухмерная матрица - это 2х2, 3х3, 4х4 и т.д.`

    if (!inputTableBox.classList.contains('hide-table')) {
      inputTableBox.classList.add('hide-table')
    }

    error.classList.remove('hide-error')
    return
  }

  tableInputs.innerHTML = ''

  for (let i = 1; i <= sum; i++) {
    let inputField = document.createElement('input');
    inputField.className = 'box__input box__input-array'
    inputField.type = 'number'
    inputField.name = `input_arr_number-${i}`
    inputField.id = `input-array-${i}`
    inputField.placeholder = `a${i}`

    tableInputs.appendChild(inputField);
  }

  boxInputsTable.style.gridTemplateColumns = `repeat(${num1}, 1fr)`
  boxInputsTable.style.gridTemplateRows = `repeat(${num2}, 1fr)`

  error.classList.add('hide-error')
  inputTableBox.classList.remove('hide-table')
}



function getMatrixValues() {
  let inputArrayAnswear = document.querySelector('#answear-array')
  
  let sum = document.querySelectorAll('.box__input-array').length
  let num2 = +inputEndArray.value

  let matrixValues = [];
  let diagonal = [];

  for (let i = 1; i <= sum; i++) {

    let inputId = 'input-array-' + i;
    let inputValue = +document.getElementById(inputId).value;

    let rowIndex = Math.floor((i - 1) / num2);
    let colIndex = (i - 1) % num2;


    if (!matrixValues[rowIndex]) {
      matrixValues[rowIndex] = [];
    }

    matrixValues[rowIndex][colIndex] = inputValue;

  }

  for (let i = 0; i < matrixValues.length; i++) {
    diagonal.push(matrixValues[i][i])
  }

  let diagonalSum = diagonal.reduce((sum, el) => sum + el)
  
  matrixValues = JSON.stringify(matrixValues)
  diagonal = JSON.stringify(diagonal)

  inputArrayAnswear.innerHTML = `let array = ${matrixValues} <br>
    Диагональ - ${diagonal}, сумма: ${diagonalSum}
  `
  inputArrayAnswear.style.display = 'block'

}