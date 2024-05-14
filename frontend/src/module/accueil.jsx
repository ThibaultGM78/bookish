import React from "react";
import "../css/accueil.css";

class Accueil extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [{"id_product":1,"product_name":"1984","product_author":"George Orwell","product_price":9.99,"product_category":"Science Fiction","product_stock":39,"product_desc":"A dystopian novel set in Airstrip One, a province of the superstate Oceania, in a world of perpetual war, omnipresent government surveillance, and public manipulation.","product_img":"http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
            {"id_product":2,"product_name":"Animal Farm","product_author":"George Orwell","product_price":7.99,"product_category":"Fiction","product_stock":41,"product_desc":"A satirical allegory of the Russian Revolution where all animals are equal, but some animals are more equal than others.","product_img":"http://books.google.com/books/content?id=UKvYEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
            {"id_product":3,"product_name":"The Great Gatsby","product_author":"F. Scott Fitzgerald","product_price":15.99,"product_category":"Novel","product_stock":28,"product_desc":"A novel set in the Jazz Age that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.","product_img":"http://books.google.com/books/content?id=iXn5U2IzVH0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}   
            ],
            i: 0
        };
    }

    nextProduct = () => {
        this.setState((prevState) => ({
            i: (prevState.i + 1) % prevState.products.length,
        }));
    }

    prevProduct = () => {
        this.setState((prevState) => ({
            i: (prevState.i + this.state.products.length - 1) % prevState.products.length,
        }));
    }

    handleViewMore = () => {
        this.props.handleViewMore(this.state.products[this.state.i]);
    }

    render(){
        return <div className="accueilDiv">
            <h4 className="accueilTitre">Best-Seller</h4>
            <img src={this.state.products[(this.state.i + this.state.products.length - 1) % this.state.products.length].product_img} className="imgSwap"/> 
            <img  className="arrow" onClick={this.prevProduct} src="src/img/fleche-gauche.png"></img>
            <img src={this.state.products[this.state.i].product_img} alt={this.state.products[this.state.i]} className="imgAccueil" onClick={this.handleViewMore}/>
            <img  className="arrow" onClick={this.nextProduct} src="src/img/fleche-droite.png"></img>
            <img src={this.state.products[(this.state.i + 1) % this.state.products.length].product_img} className="imgSwap"/> 
        </div>
    }
}

export default Accueil;