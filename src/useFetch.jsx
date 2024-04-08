import { useEffect,useState } from "react";

const useFetch = (url) => {
    const [data, setData]=useState(null);
    const [pending,setPending]=useState(false);
    const [err,setErr]=useState('');
    // const [change,setChange]=useState(false);
    // setInterval(()=>{
    //     setChange(!change)
    // },60000) Could be potentially dangerous for deployment
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
    fetchData();
    },[])

    return {data,pending,err};
}
 
export default useFetch;