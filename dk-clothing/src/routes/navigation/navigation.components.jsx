import { Outlet,Link } from 'react-router-dom'
import { Fragment } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
const Navigation = () => {
    return (
    <Fragment>
        <div className='navigation'> 
            <Link className='logo-container' to ='/'>
                <CrwnLogo classname= 'logo' />
            </Link>     
            <div className='nav-links-container'>
               <Link className='NavLink' to='/shop'> 
                 SHOP
               </Link> {/* Link is just link an anchor tag   */}
                <Link>
                CONTACT
                </Link> 
                <Link className='SignIn' to='/SignIn'>
                SIGN IN
                </Link>  
                <Link>
                CART LOGO
                </Link>    
            </div>
        </div>
        <Outlet />
    </Fragment>
    
    );
  };


  export default Navigation;