import { createAsyncThunk, createSlice, PayloadAction,createEntityAdapter } from "@reduxjs/toolkit";
import validateProduct from "../fake.api";
import { RootState } from "../store";

export interface Product {
    title: string;
    price: number;
    id: string;
}

export enum ValidationState {
  Fulfilled,
  Pending,
  Rejected,
}

interface ProductSliceState {

  validationState? : ValidationState;
  errorMessage?: string;
}

export const addProductSync = createAsyncThunk('products/addProductSync',
  async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct)
    return product;
  }
)

const initialProducts: Product[] = [
    { title: 'Genshin Impact', price:15, id: 'GI'},
    { title: 'Left 4 Dead 2', price:5, id: 'L4D2'},
    { title: 'Counter Strike: Global Offensive', price: 10, id: 'CSGO'}
]


const productAdapter = createEntityAdapter<Product>()
const initialState = productAdapter.getInitialState<ProductSliceState>({
  errorMessage: undefined,
  validationState: undefined
})

const filledInitialState = productAdapter.upsertMany(initialState, initialProducts)

  
const productsSlice = createSlice({
    name: 'products',
    initialState : filledInitialState ,
    reducers : {
        addProduct:(state,action: PayloadAction<Product>) => {
             productAdapter.upsertOne(state,action.payload)
        },
        removeProduct : (state,action: PayloadAction<string>) => {
          productAdapter.removeOne(state,action.payload)
        }
    },
    extraReducers : builder => {
      builder.addCase(addProductSync.fulfilled, (state, action) => {
        productAdapter.upsertOne(state,action.payload)
        state.validationState = ValidationState.Fulfilled
        state.errorMessage = undefined;
      })
      builder.addCase(addProductSync.rejected, (state, action) => {
        return {
          ...state,
          validationState :ValidationState.Rejected,
          errorMessage : action.error.message
        }
      })
      builder.addCase(addProductSync.pending, (state, action) => ({
        ...state,
        validationState : ValidationState.Pending,
        errorMessage : undefined
      }))
    }
})

export const {addProduct, removeProduct} = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.entities;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;
export const {
  selectAll : selectAllProducts,
  selectById : selectProductById,
  selectEntities: selectProductEntities,
  selectIds : selectProductIds,
  selectTotal : selectTotalProducts,
} = productAdapter.getSelectors<RootState>(state => state.products)
export default productsSlice.reducer;