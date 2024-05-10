import React, { useState } from "react";
import "../css/cart.css";

function RowProduct({ index, product, productId, addToCart, removeFromCart, onViewMore, totalRemoveFromCart }) {
    const [nElement, setNElement] = useState(product.nElement);

    const addToCartFront = () => {
        if(product.nElement < product.info.product_stock){
            setNElement(prevNElement => prevNElement + 1);
            addToCart(productId);
        }
       
    };

    const removeFromCartFront = () => {
        if (nElement > 1) {
            setNElement(prevNElement => prevNElement - 1);
            removeFromCart(productId);
        }
    };

    const handleViewMore = () => {
        onViewMore(productId);
    };

    const totalRemoveFromCartFront = () => {
        totalRemoveFromCart(productId);
    }

    return (
        <tr key={index}>
            <td>
                
                <img 
                    src={product.info.product_img}
                    alt={product.info.product_name}
                    style={{ width: "100px", height: "100px" }}
                    className="cartImgProduct"
                    onClick={handleViewMore}
                />
                
            </td>
            <td>
                <div className="cartColumn">
                    <button onClick={removeFromCartFront} className="cartBtn">-</button>
                    <span>{nElement}</span>
                    <button onClick={addToCartFront} className="cartBtn">+</button>       
                    <br></br>
                    <br></br>
                    <span>Stock : {product.info.product_stock}</span>
                </div>
            </td>
            <td>
                <div>
                    <span>{(product.nElement * product.info.product_price).toFixed(2)}</span>
                </div>
            </td>
            <td>
                <button onClick={totalRemoveFromCartFront}>suprimer</button>
            </td>
        </tr>
    );
}

class Cart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
        };
    }

    addToCart = (productId) => {
        console.log("t" + this.props.cart[productId].nElement);
      
            this.props.cart[productId].nElement++;
            this.setState(prevState => ({
                total: prevState.total + this.props.cart[productId].info.product_price
            }));
            console.log("cc");
        
    };

    removeFromCart = (productId) => {
        
        this.props.cart[productId].nElement--;
        this.setState(prevState => ({
            total: prevState.total - this.props.cart[productId].info.product_price
        }));
        console.log(this.props.cart);
        
    };

    totalRemoveFromCart = (productId) => {
  
        this.setState(prevState => ({
            total: prevState.total - (this.props.cart[productId].info.product_price * this.props.cart[productId].nElement)
        }));
        this.props.cart[productId].nElement = 0;
        console.log(this.props.cart);
    }

    changeMainToProduct = (productId) => {
        this.props.changeMainToProduct(this.props.cart[productId].info);
    };

    changeMainToConnexion = () => {
        this.props.changeMainToConnexion();
    }

    changeMainToPayment = () => {
        this.props.changeMainToPayment();
    }



    render() {

        this.state.total = Object.keys(this.props.cart).reduce((acc, productId) => {
            if (this.props.cart[productId].nElement > 0) {
                return acc + this.props.cart[productId].nElement * this.props.cart[productId].info.product_price;
            }
            return acc;
        }, 0);

        return (
            
            <div className="test">
                <h1>Contenu du panier</h1>
                <table className="tableau">
                    <thead>
                        <tr>
                            <th>Livre</th>
                            <th>Nombre</th>
                            <th>Prix</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {Object.keys(this.props.cart).map((productId, index) => (
                            this.props.cart[productId].nElement > 0
                            &&
                            <RowProduct
                                key={index}
                                index={index}
                                product={this.props.cart[productId]}
                                productId={productId}
                                addToCart={this.addToCart}
                                removeFromCart={this.removeFromCart}
                                onViewMore={this.changeMainToProduct}   
                                totalRemoveFromCart={this.totalRemoveFromCart}             
                            />
                        ))}
                    </tbody>
                </table>
                <span>Total : {this.state.total.toFixed(2)}</span>
                <br></br>

                {this.props.user ? (
                <button onClick={this.changeMainToPayment}>Proceder au paiment</button>
                ) : (
                    <button onClick={this.changeMainToConnexion}>Connecter vous pour proceder au paiement</button>
                )}  
            </div>
        );
    }
}

export default Cart;
