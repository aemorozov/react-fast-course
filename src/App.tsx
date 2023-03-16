import { CreateProduct } from './components/CreateProduct';
import { ErrorMassage } from './components/ErrorMessage';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Product } from './components/Product';
import { useProducts } from './hooks/products';
import { useState } from 'react'

function App() {

  const { products, loading, error } = useProducts()

  const [modal, setModal] = useState(true)

  return (
    <div className='container mx-auto max-w-2xl pt-5'>

      { loading && <Loader /> }
      { error && <ErrorMassage error={ error } /> }
      { products.map( product => <Product product={product} key={product.id} />) }

      {modal && <Modal title="Create new product">
        <CreateProduct onCreate={ () => setModal(false) } />
      </Modal>}
      
    </div>
  )
}

export default App;
