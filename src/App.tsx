import { CreateProduct } from './components/CreateProduct';
import { ErrorMassage } from './components/ErrorMessage';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Product } from './components/Product';
import { useProducts } from './hooks/products';
import { useState } from 'react'
import { IProduct } from './models';

function App() {

  const { products, loading, error, addProduct } = useProducts()

  const [modal, setModal] = useState(false)

  const createHandler = (product: IProduct) => {
    setModal(false)
    addProduct(product)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>

      { loading && <Loader /> }
      { error && <ErrorMassage error={ error } /> }
      { products.map( product => <Product product={product} key={product.id} />) }

      { modal && <Modal title="Create new product" onClose={ () => setModal(false) }>
        <CreateProduct onCreate={ createHandler } />
      </Modal> }

      <button 
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 pb-2.5 pt-1'
        onClick={ () => setModal(true) }  
      >+</button>
      
    </div>
  )
}

export default App;
