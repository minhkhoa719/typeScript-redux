
import { useSelector } from 'react-redux'
import { addToCart } from '../Cart/cart.slice'
import { RootState } from '../store'
import { useAppdispatch } from '../store.hook'
import { getProductsSelector, Product, removeProduct, selectAllProducts, selectProductById, selectProductEntities, selectProductIds, selectTotalProducts } from './ProductsSlice'




const ProductsList: React.FC = () => {
  const products = useSelector(selectAllProducts)
  const gi = useSelector<RootState>(state => selectProductById(state, 'GI'))
  const totalNumberOfProducts = useSelector(selectTotalProducts); 
  const productids = useSelector(selectProductIds);
  const entities = useSelector(selectProductEntities);
  console.log(products);
  console.log(gi);
  console.log(totalNumberOfProducts);
  console.log(productids);
  console.log(entities);
  

  const dispatch = useAppdispatch()
  const removeFromStore = (id: string) => {
    dispatch(removeProduct(id))
  }
  
  const addToCartHandle = (product: Product) => dispatch(addToCart(product))

  return (
    <div>
        <h2>Game Lists</h2>
        {products.map((product) =>(
          <div key={product.id}>
            <span>{product.title} : ${product.price}</span>
            <button onClick={()=> addToCartHandle(product)}>Add to cart</button>
            <button onClick={() => removeFromStore(product.id)}>Remove from the store</button>
          </div>
        ))}
        
    </div>
  )
}

export default ProductsList