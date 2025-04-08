import { Outlet,Link } from 'react-router-dom'
import { Fragment , useContext } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'

import CartIcon from '../../Component/cart-icon/cart-icon.component';
import CartDropdown from '../../Component/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { SignOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext);

    // console.log(currentUser);
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
               {currentUser ? (
                    <span className='nav-link' onClick={SignOutUser}>Sign Out</span>
                ) : (
                <Link className='nav-link' to='/auth'>
                    SIGN IN
                    </Link>  
                )}
                <Link>
                CONTACT
                </Link> 
                <Link>
                  <CartIcon />
                </Link>    
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
    </Fragment>
   
    );
  };


  export default Navigation;