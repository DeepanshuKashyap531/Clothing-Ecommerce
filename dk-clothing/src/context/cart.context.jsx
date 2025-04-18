import { createContext,useState,useEffect } from "react";

const addCartItem = (cartItems,productToAdd) => {
    //find if cardItems conains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //If Found , increment quantity

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem,quantity: cartItem.quantity + 1}
     : cartItem
    );
    }
    // return new array with modified cartItem/ new cart item
    return [...cartItems , {...productToAdd , quantity:1}]
} 
const removeCartItem = (cartItems , cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if the quantity is equal to 1 , if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    // rreturn back cartitem with matching cart item with reduced quantity
    return cartItems.map((cartItem)=> 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem,quantity: cartItem.quantity - 1 }
    : cartItem
);
}

const clearCartItem = (cartItems , cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen:  () => {},
    cartItems : [],
    addItemToCart : () => {},
    removieItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    carttotal : 0

});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItem] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total ,cartItem) => total + cartItem.quantity , 0)
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total ,cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems,productToAdd))
    };
    
    const removeItemToCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItem(clearCartItem(cartItems,cartItemToClear))
    }



    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        cartItems,
        clearItemFromCart,
        cartTotal,
        cartCount};

    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}