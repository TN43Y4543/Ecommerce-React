import React, { useState,useEffect } from 'react'
import Head from './Head'
import Deal from './Deal'
import  "../components/style.css"
import {LifeLine} from 'react-loading-indicators'


const Home = () => {
  
  let[loading,setLoading]=useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if(loading)
    {
      return <div >
        <center>
        <LifeLine color="#32e032" size="medium" text="Loading" textColor="" />
        </center>
      </div>
    }
  else
  {
    return (
      <div className='Home'>
          <Head></Head>
          <Deal></Deal>
      </div>
    )
   
    

  }

}

export default Home
