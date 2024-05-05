import React, { useEffect, useState } from "react";
import { URL_API } from '../constantes';
import "../css/catalog.css";

function ProductCard({ product, onViewMore }) {
    const handleViewMore = () => {
        onViewMore(product);
    };

    return (
        <div className="cardProduct">
            <img className="imgProduct" src={product.product_img} alt={product.product_img} onClick={handleViewMore}/>
            <div className="cardBody">
                <h5 className="card-title">{product.product_name.substring(0, 20)}</h5>
                <p className="card-text">{product.product_author}</p>
                <p className="card-text">{product.product_desc.substring(0, 50)} ...</p>
                <p className="card-text">{product.product_price} €</p>
                <div>
                    <button onClick={handleViewMore} className="btn btn-dark">Voir plus</button>
                </div>
            </div>
        </div>
    );
}

function DisplayProduct({ products, onViewMore }) {
    const chunkSize = 3;
    const productChunks = [];

    for (let i = 0; i < products.length; i += chunkSize) {
        productChunks.push(products.slice(i, i + chunkSize));
    }

    return (
        <div className="ProducTable">
            <table>
                <tbody>
                    {productChunks.map((chunk, index) => (
                        <tr key={index}>
                            {(chunk.length == 1 && index == 0) &&
                            <td> &emsp;  &emsp;  &emsp;  &emsp;  &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;</td>}
                            {(chunk.length == 1 && index > 0) && <td></td>}

                            {chunk.map((product, index) => (
                                <td key={index}>
                                        <ProductCard product={product} onViewMore={onViewMore} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



function ProductTable({ category, search, author, sort, onViewMore }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        let url = URL_API + 'getProductsList?category=' + category + '&search=' + search + '&author=' + author + '&sort=' + sort;
        console.log(url);
        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err));
        }
    }, [category, search]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="full">
            {data.length === 0 || data.error ? (
                <div>Pas de résultat</div>
            ) : (
                <div className="full">
                 

                    <DisplayProduct
                        products={data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
                        onViewMore={onViewMore} 
                    />
                    
                    <div className="arrow">
                        {currentPage > 0 && (
                            <button onClick={handlePrevPage} className="arrowButton">&lt;</button>
                        )}
                        <span>{currentPage + 1} / {totalPages}</span>
                        {currentPage < totalPages - 1 && (
                            <button onClick={handleNextPage} className="arrowButton">&gt;</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

class Category extends React.Component {
    changeMain = (product) => {
        const userFilterJson = {
            category: this.props.category,
            search: this.props.search,
            author: this.props.author,
            sort: this.props.sort
        }
        const userFilter = JSON.stringify(userFilterJson)
        this.props.changeMain(product, userFilter);
    };

    render() {
        return (
            <div className="full">
                <ProductTable
                    key={this.props.category + this.props.search + this.props.author + this.props.sort}
                    category={this.props.category}
                    search={this.props.search}
                    author={this.props.author}
                    sort={this.props.sort}
                    onViewMore={this.changeMain}
                    
                />
            </div>
        );
    }
}

export default Category;
