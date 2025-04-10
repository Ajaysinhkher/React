import React from 'react'
import { useEffect,useState } from 'react'   
import { useLoaderData } from 'react-router'

function Github() {

    const data = useLoaderData()
    // const [data, setData] = useState([])  //useState is a hook that allows you to add state to a functional component. It returns an array with two elements: the current state value and a function to update it.

    // useEffect(() => {

    //     fetch("https://api.github.com/users/hiteshchoudhary")
    //     .then((response) => response.json())
    //     .then(data=>{
    //         setData(data)
    //     })
    //     console.log(data); 
      
    // },[])

    console.log(data);
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>

  )
}

export default Github


export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}

// loader will help to fetch the data at route level instead of component level (avoiding waterfall problem).