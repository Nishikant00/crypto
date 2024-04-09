import { useEffect,useState } from "react";

const useFetch = (url) => {
    const [data, setData]=useState(null);
    const [pending,setPending]=useState(false);
    const [err,setErr]=useState('');
    
        useEffect(()=>{
            const fetchData = async () =>{
            try{
                setPending(!pending)
                const response = await fetch(url)
                if (!response.ok){
                    throw new Error('The data could not be fetched')
                }
                const responseData=await response.json()
                setPending(!pending) 
                setData(responseData)
            }catch (e){
                setErr(e.message)
                setPending(!pending)
                console.log(e.message)
            }
        }
        setTimeout(()=>{

            fetchData();
        },3000)
        },[])
    
    
       
    
    return {data,pending,err};
}
 
export default useFetch;