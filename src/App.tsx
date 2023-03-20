import { CreateProduct } from './components/CreateProduct';
import { ErrorMassage } from './components/ErrorMessage';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Product } from './components/Product';
import { useProducts } from './hooks/products';
import { useContext } from 'react'
import { IProduct } from './models';
import { ModalContext } from './context/ModalContext';

function App() {

  const { products, loading, error, addProduct } = useProducts()

  const { modal, open, close } = useContext(ModalContext)

  const createHandler = (product: IProduct) => {
    close()
    addProduct(product)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>

      { loading && <Loader /> }
      { error && <ErrorMassage error={ error } /> }
      { products.map( product => <Product product={product} key={product.id} />) }

      { modal && <Modal title="Create new product" onClose={ close }>
        <CreateProduct onCreate={ createHandler } />
      </Modal> }

      <button 
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 pb-2.5 pt-1'
        onClick={ open }  
      >+</button>
      
    </div>
  )
}

export default App;
