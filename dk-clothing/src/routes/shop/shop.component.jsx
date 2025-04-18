import  {useContext} from 'react';

import { ProductsContext } from '../../context/product.context';

import ProductCard from '../../Component/product_card/product_card.component';

import './shop.styles.scss'
const Shop = () => {
    const {products} = useContext(ProductsContext)
    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCard key = {product.id} product = {product} />
            ))};
        </div>
    );
};


export default Shop;