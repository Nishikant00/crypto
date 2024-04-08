import { Link } from "react-router-dom";
import useFetch from "./useFetch";
const Coins = () => {

    const indiancurrency=(amt)=>
        {
        var x=amt;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
        lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
        }
    const {data,pending,err}=useFetch("https://api.coingecko.com/api/v3/search/trending");
    const {data:mcoins,pending:mpending,err:merr}=useFetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
    return ( <>
    <div className="flex flex-col gap-1 max-w-6xl mx-auto p-2 w-full">
        <div>  
        <div>
        <h1 className="font-bold text-4xl border-b-2 py-2"><span className="text-yellow-500">T</span>rending</h1>
        {data && data.coins.map((coin)=>(
         <Link to={`/details/${coin.item.id}`} key={coin.item.coin_id}>    
            <div className="text-center" >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center ml-2 border-b-2 border-white hover:bg-blue-600" >
                <img className="m-1 py-2 pl-8 sm:pl-12 md:pl-20 lg:pl-24" src={coin.item.thumb} alt="{coin.item.name}" />
                <p>{coin.item.name}</p>
                <p className="hidden sm:block">BTC Price <br></br>{coin.item.data.price}</p>
                <p className="hidden md:block">{coin.item.symbol}</p>
            </div>
            </div>
        </Link>   
        ))}
        </div>

        <div> 
        <h2 className="font-bold text-4xl border-b-2 py-2 "><span className="text-yellow-500">A</span>ll Coins</h2>
        {mcoins && mcoins.map((coin)=>(
            <Link to={`/details/${coin.id}`} key={coin.id}>
            <div className="text-center" key={coin.id}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center ml-2 border-b-2 border-white hover:bg-blue-600" >
                <img className="m-1 py-2 pl-8 sm:pl-12 md:pl-20 lg:pl-24 h-20" src={coin.image} alt="{coin.item.name}" />
                <p>{coin.name}</p>
                <p className="hidden sm:block font-bold">{indiancurrency(coin.current_price)+" ₹"}</p>
                <p className="hidden md:block">Market Cap <br/>{indiancurrency(coin.market_cap)+" ₹"}</p>
                <p className={`hidden md:block ${coin.price_change_percentage_24h<0 ? "text-red-500":"text-green-500 "}`}>{coin.price_change_percentage_24h>0 ? "📈"+coin.price_change_percentage_24h :"📉"+coin.price_change_percentage_24h }</p>
            </div>
            </div>
            </Link>
        ))}
        </div>
        </div>
    </div>
        
    </> );
}
 
export default Coins;