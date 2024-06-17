
import React, {  useState } from 'react'

import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

const Add = ({FOOD_LIST_URL}) => {

  const [image , setImage] = useState(false);

  const [data , setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
    
   
  })

  const navigate = useNavigate();

const onChangeHandler = (e) => {
 const name = e.target.name;
 const value = e.target.value;

 setData(data=>({...data , [name]:value}))

}

const onSubmitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image' , image);
  formData.append('name' , data.name);
  formData.append('description' , data.description);
  formData.append('category' , data.category);
  formData.append('price' , Number(data.price));


  const response = await axios.post(`${FOOD_LIST_URL}/api/food/add` , formData);

  // check for conditions

  if(response.data.success){

    setData({
      name: '',
      description: '',
      category: 'Salad',
      price: ''
     
    })
    setImage(false)

    toast.success(response.data.message);

    navigate('/list');


  }

  else{
    toast.error(response.data.message);
  }

  
  console.log(response);

  //console.log(data)
}

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">

          <p>Upload Image</p>

          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p> Product Category</p>

            <select onChange={onChangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noddles">Noddles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='€20' />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Add