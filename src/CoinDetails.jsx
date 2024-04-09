import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import moment from "moment";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  
const CoinDetails = () => {
    const id=useParams();   
   
    
    const {data,pending,err}=useFetch(`https://api.coingecko.com/api/v3/coins/${id.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
    const {data:history,pending:hpending,err:herr}=useFetch(`https://api.coingecko.com/api/v3/coins/${id.id}/market_chart?vs_currency=inr&days=7`)
    if(!data || !history){
        return (<div className="flex justify-center mt-72"><img src="/bitcoinanim.gif"></img></div>)
    }
    const chart=history?.prices.map(value=>({x:value[0],y:value[1].toFixed(2)}))

    const options={
        responsive:true
    }
    const datas={
        labels:chart?.map(value=>moment(value.x).format('MMMDD')),
        datasets:[{
            fill:true,
            label:id.id,
            data:chart?.map(value=>value.y),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor:'rgba(53, 162, 235, 0.5)',
            
        }]
    }
    return ( <>
    <div className="my-6">
        <div className="flex flex-col gap-2 mx-auto max-w-6xl w-full items-center p-4">
        
        <Line options={options} data={datas} ></Line>
        
            <img src={data && data.image.large} alt={data && data.name} />
            <p>Market Cap Rank: {data && data.market_cap_rank}</p>
            {data &&  data.market_data.price_change_percentage_24h>0 ? <p >Price Change % 24H: <span className="text-green-500">{data && data.market_data.price_change_percentage_24h}</span> </p> :<p >Price Change % 24H:  <span className="text-red-500">{data && data.market_data.price_change_percentage_24h}</span></p>}
            <p>Current Price: {data && data.market_data.current_price.inr.toLocaleString('en-IN')+" ₹"}</p>
            <h1 className="font-bold text-3xl text-blue-400"><a href={data && data.links.homepage[0]} target='blank'>{data && data.name}</a> </h1>
            <p className="text-justify [&>a]:text-blue-400" dangerouslySetInnerHTML={data &&{__html:data.description.en}}></p>
        </div>
    </div>
    </> );
}
 
export default CoinDetails;