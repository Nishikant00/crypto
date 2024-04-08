
import { Link } from 'react-router-dom';
import{ Dollar }from './assets/icons'

const Navbar = () => {
    
    return ( <>
    <nav className="flex items-center bg-blue-500">
        <div className='flex flex-wrap justify-center md:justify-between gap-1 max-w-6xl w-full mx-auto p-2 cursor-pointer font-bold text-4xl'>
        <Link to='/'>
        <h2 className='flex'><Dollar/><span className='ml-1 text-yellow-500'>C</span>rypto <span className='ml-1 text-yellow-500'>M</span>ania</h2>
        </Link>
        
        </div>
    </nav>
    </> );
}
 
export default Navbar;