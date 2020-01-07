
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 200,
    salePrice: undefined, 
    rating: 4.3
}

// const {label, stock, rating = 5} = product

// console.log(label)
// console.log(stock)
// console.log(rating)

const trasaction = (type, { label, stock}) => {
    console.log(type, label, stock)
}

trasaction('order', product)