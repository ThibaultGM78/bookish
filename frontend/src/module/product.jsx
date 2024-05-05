import React from "react";
import "../css/product.css";
import Category from "./catalog";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nElement: this.props.cart[this.props.product.id_product] ?  this.props.cart[this.props.product.id_product].nElement : 0,
        };
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    addToCart() {

        if(!this.props.cart[this.props.product.id_product]){
            this.props.cart[this.props.product.id_product] = {nElement: 0, info: this.props.product};
        }

        if(this.state.nElement < this.props.product.product_stock){
            this.props.cart[this.props.product.id_product].nElement++;
            this.setState({ nElement: this.state.nElement + 1 });
            console.log(this.props.cat);
        }
    }

    removeFromCart() {
        if(this.state.nElement > 0){
            this.props.cart[this.props.product.id_product].nElement--;
            this.setState({ nElement: this.state.nElement - 1 });
            console.log(this.props.cat);
        }
    }

    changeMain = () => {
        this.props.changeMain(this.props.userFilter);
    };

    render() {
        const product = this.props.product;
        
        return (
            <div>
              {this.props.userFilter && (
                <p onClick={this.changeMain}>&lt;---</p>
            )}
                <div className="product">
                    <div className="productContent">
                        <div className="productImg">
                            <a href={product.product_img} target="_blank">
                                <img src={product.product_img} alt={product.product_name} />
                            </a>  
                        </div>
                        <div className="productDetails">
                            <h2>{product.product_name}</h2>
                            <p><strong>Auteur:</strong> {product.product_author}</p>
                            <p><strong>Prix:</strong> {product.product_price} €</p>
                            <p><strong>Catégorie:</strong> {product.product_category}</p>
                            <p><strong>Stock:</strong> {product.product_stock}</p>
                            <p><strong>Description:</strong> {product.product_desc}</p>
                            <div className="quantityControl">
                                <button onClick={this.removeFromCart} className="cartButton">-</button>
                                <span>   </span>
                                <span className="quantity">{this.state.nElement}</span>
                                <span>   </span>
                                <button onClick={this.addToCart} className="cartButton">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
