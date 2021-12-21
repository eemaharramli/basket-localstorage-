const addToBasket = document.querySelectorAll('.product button')
const basketCountSpan = document.querySelector('.basket-count')
const basketText = document.querySelector('.basket-text')
const showAllBtn = document.querySelector('.show-all')

const items = []

let basketCount = 0

addToBasket.forEach(item=>{
    item.addEventListener('click', function () {
        if (item.textContent === 'Add to basket'){
            basketCount++
            basketCountSpan.textContent = basketCount
            item.textContent = 'Remove'
            items.push(item)

        }
        else{
            basketCount--
            basketCountSpan.textContent = basketCount
            item.textContent = 'Add to basket'
        }
    })
})
    
showAllBtn.addEventListener('click', function () {
    
})





