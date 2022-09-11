const inputBill = document.querySelector('#input-bill')
const inputPeople = document.querySelector('#input-number-of-people')
const selectOptions = document.querySelector('.select-tip__options')
const inputCustomOption = document.querySelector('#input-custom-tip')
const regExpAccDots = new RegExp(/[^\d.]/gm)
const regExpOnlyInt = new RegExp(/\D/gm)

inputBill.addEventListener('keyup', () => {
    inputBill.value = inputBill.value.replace(regExpAccDots, '')
    if (inputBill.value == '') return
    else if (inputBill.value == 0) {
        inputBill.previousElementSibling.style.display = 'block'
        return
    }
    inputBill.previousElementSibling.style.display = 'none'
    calculateTip()
})

inputPeople.addEventListener('keyup', () => {
    inputPeople.value = inputPeople.value.replace(regExpOnlyInt, '')
    if (inputPeople.value == '') return
    else if (inputPeople.value == 0) {
        inputPeople.previousElementSibling.style.display = 'block'
        return
    }
    inputPeople.previousElementSibling.style.display = 'none'
    calculateTip()
})

let optionValue = 0

selectOptions.addEventListener('click', (ev) => {
    document.querySelectorAll('li').forEach(option => {
        option.classList.remove('--active')
    })

    if (ev.target.closest('li')) {
        ev.target.closest('li').classList.add('--active')
        optionValue = parseFloat(ev.target.closest('li').innerText)
        inputCustomOption.value = ''
        calculateTip()
    }
})

inputCustomOption.addEventListener('keyup', () => {
    inputCustomOption.value = inputCustomOption.value.replace(regExpAccDots, '')
    optionValue = parseFloat(inputCustomOption.value)
    calculateTip()
})


const calculateTip = () => {
    if (inputBill.value == '' || inputPeople.value == '' || optionValue == '') {
        setTotal(0, 0)
        return
    }
    const billAmount = parseFloat(inputBill.value)
    let peopleNumber = parseInt(inputPeople.value)

    const totalTipAmount = ((billAmount * optionValue / 100) / peopleNumber)
    const total = ((billAmount + billAmount * optionValue / 100) / peopleNumber)

    setTotal(totalTipAmount, total)
}


const setTotal = (tipAmount, total) => {
    const spanTipAmount = document.querySelector('span#total-tip-amount')
    const spanTotal = document.querySelector('span#total')
    spanTipAmount.innerText = tipAmount.toFixed(2)
    spanTotal.innerText = total.toFixed(2)
}

document.querySelector('.btn-reset').addEventListener('click', (ev) => {
    ev.preventDefault()
    setTotal(0, 0)
})