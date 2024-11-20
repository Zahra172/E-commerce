import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import { CounterContext } from '../../Context/Context'
import GetRecentProducts from '../GetRecentProducts/GetRecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {
    
    let {setCounter ,changeCounter} = useContext(CounterContext);

    useEffect(()=>{},[])
  return (<>
  <div className='' >
    <MainSlider/>
    <CategorySlider/>
    <GetRecentProducts/>

{/* <button className='bg-pink-700 p-4 rounded-md my-5' onClick={changeCounter}>change</button> */}
  </div>
  </>
    
  )
}
