import React, { useState } from "react";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import Accueil from "./module/accueil";
import Header from "./module/header";
import Footer from "./module/footer";
import LeftMenu from "./module/leftMenu";
import Category from "./module/catalog";
import Connexion from "./module/connexion";
import SignUpForm from "./module/signUpForm";
import Product from "./module/product";
import Cart from "./module/cart";
import Payment from "./module/Payment";
import AddProduct from "./module/addProduct";

function App() {
    const [leftMenuVisible, setLeftMenuVisible] = useState(false); 
    const [mainContent, setMainContent] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [user, setUser] = useState('');
    const [cart, setCart] = useState({});

    const toggleLeftMenu = () => {

        if(leftMenuVisible){
            setLeftMenuVisible(false);
        }
        else{
            setLeftMenuVisible(true);
        }
    };

    const changeMainContent = (content) => {
        setMainContent(content);
    };

    const changeCategory = (newCategory) => {
        setCategory(newCategory);
        changeMainContent(<Category category={newCategory} search={search} author={author} sort={sort} changeMain={changeMainToProduct}/>)
    };

    const changeSearch = (newSearch) => {
        setSearch(newSearch);
        changeMainContent(<Category category={category} search={newSearch} author={author} sort={sort} changeMain={changeMainToProduct}/>)
    };

    const changeAuthor = (newAuthor) => {
        setAuthor(newAuthor);
        changeMainContent(<Category category={category} search={search} author={newAuthor} sort={sort} changeMain={changeMainToProduct}/>)
    };

    const changeSort = (newSort) => {
        setSort(newSort);
        changeMainContent(<Category category={category} search={search} author={author} sort={newSort} changeMain={changeMainToProduct}/>)
    };

    //user
    const changeUser = (newUser) => {
    
        setUser(newUser);
        changeMainContent(<Accueil handleViewMore={
            (product,userFilter) => {
            console.log("AppUser: " + newUser.user_name);
        
            changeMainContent(<Product product={product} cart={cart} changeMain={changeProductToCatalog} userFilter={userFilter} user={newUser}/>)
            }
        }
        />);
        
    };
    
    
    const logoutUser = () => {
        setUser('');
    };

    //Page
    const changeMainToConnexion = () => {
        changeMainContent(<Connexion changeUser={changeUser} changeMainToSignUp={changeMainToSignUp} changeMain={changeMainContent}/>);
    };
    const  changeMainToSignUp = () => {
        changeMainContent(<SignUpForm changeMainToConnexion={changeMainToConnexion}/>);
    };
    const changeMainToProduct = (product,userFilter) => {
        console.log("AppUser: " + user.user_name);
        changeMainContent(<Product product={product} cart={cart} changeMain={changeProductToCatalog} userFilter={userFilter} user={user}/>);
    }
    const changeMainToCart = () => {
        console.log("AppUser: " + user.user_name);
        changeMainContent(<Cart cart={cart} changeMainToProduct={changeMainToProduct}  changeMainToConnexion={changeMainToConnexion} changeMainToPayment={changeMainToPayment} user={user}/>);
    }
    const changeProductToCatalog = (userFilter) => {
        const userFilterJson = JSON.parse(userFilter);
        changeMainContent(<Category category={userFilterJson.category} search={userFilterJson.search} author={userFilterJson.author} sort={userFilterJson.sort} changeMain={changeMainToProduct}/>)
    }
    const goToCatalog = () => {
        changeMainContent(<Category category={category} search={search} author={author} sort={sort} changeMain={changeMainToProduct}/>);
    }
    const changeMainToPayment = () => {
        changeMainContent(<Payment user={user} cart={cart} paymentMade={paymentMade}/>)
    }
    const changeMainToAccueil = () => {
        changeMainContent(<Accueil handleViewMore={changeMainToProduct}/>);
    }

    const changeMainToAdd = () => {
        changeMainContent(<AddProduct changeMainToAccueil={changeMainToAccueil}/>);
    }

    const paymentMade = () => {
        setCart({});
        changeMainContent(<Accueil handleViewMore={changeMainToProduct}/>);
    }

   
    return (
        <div className="appDiv">
            <Header changeSearch={changeSearch} changeMainToConnexion={changeMainToConnexion} user={user} 
            logoutUser={logoutUser} changeMainToCart={changeMainToCart} leftMenuVisible={leftMenuVisible} toggleLeftMenu={toggleLeftMenu}
            goToCatalog={goToCatalog} changeMainToAccueil={changeMainToAccueil}  changeMainToAdd={ changeMainToAdd}
            />
            <div style={{ display: leftMenuVisible ? 'block' : 'none' }}>
                <LeftMenu changeCategory={changeCategory} changeAuthor={changeAuthor} changeSort={changeSort}/>
            </div>
            <div className="mainContent">
                {mainContent ? mainContent : <Accueil handleViewMore={changeMainToProduct}/>}
            </div>
            <Footer changeMain={changeMainContent}/>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);