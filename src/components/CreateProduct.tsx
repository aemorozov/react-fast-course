import axios from "axios"
import React, { useState } from "react"
import { IProduct } from "../models"
import { ErrorMassage } from "./ErrorMessage"

const productData: IProduct = {
    title: '',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateModalProps {
    onCreate: () => void
}

export function CreateProduct({ onCreate }: CreateModalProps) {

    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if (value.trim().length === 0) {
            setError('Please enter valid title')
            return
        }
        productData.title = value
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        onCreate()
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <input 
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-0"
                placeholder="Enter product name..."
                value={ value }
                onChange={ changeHandler }
            />
            <button
                type="submit"
                className="py-2 px-4 border bg-yellow-400 hover:text-white hover:bg-blue-400"
            >Submit</button>
            {error && <ErrorMassage error={ error } />}
        </form>
    )
}