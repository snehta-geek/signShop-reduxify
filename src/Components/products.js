import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "../Redux/Slice/productSlice"
import Counter from './counter';


const Products = () => {

  const dispatch = useDispatch();

  const state = useSelector(data => data.product)
  console.log("state---", state);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div>
      {state.isLoading ?
        (
          <div style={{textAlign: "center"}}>
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
        :
        <>
         <div class="row row-cols-1 row-cols-md-4 g-4" style={{margin : "auto"}}>         
            {state?.data?.map(item => (
              <div class="col" key={item.id} style={{margin : 20}}>
              <div className="card" style={{width : 400,height: 300, textAlign: "center"}}>
                <div style={{margin: "auto"}}>
                <img src={item.image} style={{width : 200,height: 100,margin: "auto"}} className="card-img-top" alt="product img" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  {/* <p className="card-text">{item.description}</p> */}
                  <Counter itemId={item.id}/>
                </div>
                </div>
              </div>
              </div>

          ))}

        </div>
        </>
      }
      </div>
     
       
  )
}

export default Products