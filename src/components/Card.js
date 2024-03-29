import React, { useEffect, useState, useRef } from 'react'
import { useDispatchCard , useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCard();
  let data = useCart() ;
  const pirceRef = useRef();
 let options = props.options;
 let priceOptions = Object.keys(options); // half & value sotred in a seperate object
//  let foodItems = props.foodItem

const [qty , setqty] = useState('1')
const [size , setsize] = useState("")
const handleAddtoCard =async()=>{
  let food = []
  // abhi tak jo daal chuka hu to check kr rahu jo ab daal raha hu vo pahale sae to ni h 
  for(const item of data){
    if(item.id === props.foodItem._id){
      food= item;
      break;
    }
  }

  if(food.length !== 0){
    // that means order is still half/full we just upgrade the qty therefore update req is needed
   if(food.size === size){
    console.log("update is called")
    await dispatch({type:"UPDATE" , id:props.foodItem._id , price:finalPrice ,qty:qty})
    return 
   }
  
  else if(food.size !== size){
    console.log("item is present but this tym size is different ")
 await dispatch({type:"ADD", id:props.foodItem._id , name:props.foodItem.name ,price:finalPrice,qty:qty,size:size ,img:props.foodItem.img})
 return 

  }
  return 
}
  console.log("item added for first time");
  await dispatch({type:"ADD", id:props.foodItem._id , name:props.foodItem.name ,price:finalPrice,qty:qty,size:size ,img:props.foodItem.img})
 

}

let finalPrice = qty * parseInt(options[size]);
useEffect(()=>{
setsize(pirceRef.current.value)
} , [])


  return (
    <div>
      
        <div className="card mt-3" style={{"width": "18rem" , "maxHeight":"360px"}}>
          <img src={props.foodItem.img} className="card-img-top"  alt="Card image cap" style={{height:"180px", objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text"> 
              This is some important  Task
            </p> */}
            <div className='container w-100'>
              <select  className='m-2 h-100  bg-sucess rounded bgColor'onChange={(e)=>setqty(e.target.value)} style={{color:"white"}}>
                {Array.from(Array(6) , (e,i)=>{
                  return(
                    <option key={i+1} value={i+1} >{i+1} </option>
                  )
                } ) }
              </select>
              <select   className='m-2 h-100  bg-sucess rounded bgColor' ref={pirceRef} onChange={(e)=>setsize(e.target.value)} style={{color:"white"}} >
               {
                priceOptions.map((data)=>{

                  return <option key={data} value={data}>{data}</option>
                })
               }
              </select>
              <div className='d-inline h-100 fs-4'>
              ₹{finalPrice}/-
              </div>

            </div>
            <hr></hr>
            <button  className={'btn btn-sucess justify-center ms-2 bgColor'} onClick={handleAddtoCard}>Add to Card</button>
          </div>
        </div>
  

    </div>
    
  )
}
