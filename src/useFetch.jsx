import { useEffect, useState } from "react";

const useFetch = (url, maxRetries = 3, initialDelay = 1000) => {
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(false);
    const [err, setErr] = useState('');
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPending(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('The data could not be fetched');
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (e) {
                if (retryCount < maxRetries) {
                    
                    const delay = Math.pow(2, retryCount) * initialDelay;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    setRetryCount(retryCount + 1);
                    fetchData(); 
                } else {
                    setErr(e.message);
                    console.log(e.message);
                }
            } finally {
                setPending(false); 
            }
        };

        fetchData(); 
    }, [url, maxRetries, initialDelay]); 

    return { data, pending, err };
};

export default useFetch;
