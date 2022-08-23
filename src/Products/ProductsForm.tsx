import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppdispatch } from '../store.hook'
import { addProduct, addProductSync, getErrorMessage, Product } from './ProductsSlice'


const ProductsForm : React.FC = () => {

    const dispatch = useAppdispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [product, setProduct] = useState<Product>({
        id : '', 
        price:0,
        title : ''
    })

    const handleChange = ({target  :{name,value}}: 
        React.ChangeEvent<HTMLInputElement>) => 
        setProduct(prev => {
            (prev as any )[name] = value;
            const newValue = {... prev}
            return newValue;
        })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        dispatch(addProductSync(product))
        
    }
    const {title, price ,id} = product;
    
  return (
    <div>
    <h2>Add game to the store</h2>
    {errorMessage && <span>error : {errorMessage}</span>}
        <form onSubmit={handleSubmit}>
            <input 
            style={{border: errorMessage ? "1px solid red" : "1px solid black"}}
            type="text" 
            placeholder = "Game title" 
            name ="title" 
            value ={title} 
            onChange = {handleChange}/>
            <input 
            style={{border: errorMessage ? "1px solid red" : "1px solid black"}}
            type="number" 
            placeholder = "Game price" 
            name = "price" 
            value ={price}
            onChange = {handleChange}/>
            <input 
            style={{border: errorMessage ? "1px solid red" : "1px solid black"}}
            type="text" 
            placeholder = "Game id" 
            name = "id" 
            value ={id}
            onChange = {handleChange}
            />
            <button type = "submit">Add product</button>
        </form>
    </div>
  )
}

export default ProductsForm