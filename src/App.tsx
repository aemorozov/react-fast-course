import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Product } from './components/Product';
import { IProduct } from './models';

function App() {

  const [products, setProducts] = useState<IProduct[]>([]) // кортеж, который отображает наши товары, если они загрузились
  const [loading, setLoading] = useState(true) // кортеж для отображения надписи loading... если товаров нет
  const [error, setError] = useState('') // кортеж для отображения ошибки

  async function fetchProducts() { // функция для загрузки товаров с сервера
    try { // пробуем загрузить данные
      setError('') // если мы заново загружаем данные, то очищаем ошибку
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5') // загрузка товаров с сервера
      setProducts(response.data) // закидываем загруженные товары в useState с товарами для отображения
      setLoading(false) // изменение надписи loading... когда товары загрузились
    } catch (e: unknown) { // если данные не загружены, то выдаём ошибку
      const error = e as AxiosError // забираем ошибку из Axios
      setLoading(false) // изменение надписи loading... когда товары загрузились
      setError(error.message) // пишем ошибку
    }
    
  }

  useEffect(() => { // вызываем один раз колбэк для загрузки товаров с сервера
    fetchProducts() // вызываем функцию, в которой происходит загрузка
  }, [])

  return (
    <div className='container mx-auto max-w-2xl pt-5'>

      { loading && <p className='text-center'>Loading...</p>}
      { error && <p className='text-center text-red-600'>{ error }</p>}
      { products.map( product => <Product product={product} key={product.id} />)}
      
    </div>
  )
}

export default App;
