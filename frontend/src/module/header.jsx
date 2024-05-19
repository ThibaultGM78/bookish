import React from 'react';
import Accueil from './accueil';
import "../css/header.css";

function DivUser({ user, changeMainToConnexion, logoutUser }) {
    console.log("reload " + user);
    if (!user) {

        return <div className='headerUser'>
            <p onClick={changeMainToConnexion} className='headerUserFun'>Connexion</p>
        </div>
    } else {
        return  <div className='headerUser'>
            <p  className='headerUserFun'>{user.user_name}</p>
            <p onClick={logoutUser}  className='headerUserFun'>Déconnexion</p>
        </div>
        
    }
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    changeMain = (balise) => {
        this.props.changeMain(balise);
    };

    changeMainToConnexion = () => {
        this.props.changeMainToConnexion("changeMainToConnexion");
    };

    changeMainToCart = () => {
        this.props.changeMainToCart("changeMainToCart");
    };

    changeMainToAccueil = () => {
        this.props.changeMainToAccueil();
    }

    changeMainToAdd = () => {
        this.props.changeMainToAdd();
    }

    logoutUser = () => {
        this.props.logoutUser("logoutUser");
    };

    goToCatalog = () => {
        this.props.goToCatalog();
    }

    handleFilterTextChange(e) {
        this.setState({ filterText: e.target.value });
       
    }

    handleKeyDown(e){
        if(e.key == "Enter"){
            console.log("ENTER");
            this.props.changeSearch(this.state.filterText);
        }

    }

    toggleLeftMenu = () => {
        this.props.toggleLeftMenu("go");
    }

    render() {
        return (
            <div className="header">
                <div className="menuToggle" onClick={this.toggleLeftMenu}>
                    <div className={`bar ${this.props.leftMenuVisible ? 'change1' : ''}`}></div>
                    <div className={`bar ${this.props.leftMenuVisible ? 'change2' : ''}`}></div>
                    <div className={`bar ${this.props.leftMenuVisible ? 'change3' : ''}`}></div>
                </div>
                <div className="headerSite">
                    <img src="src/img/logo.jpeg" alt="logo" className="headerLogo" onClick={this.changeMainToAccueil}/>
                    <a href="#" className='headerSiteName' onClick={this.changeMainToAccueil}><h1>BookishStore</h1></a>
                </div>
                <div className="searchBox">
                    <img onClick={this.goToCatalog} src="src/img/loupe.png" alt="recherche" className='loupeImg'/>
                    <input type="text" value={this.state.filterText} placeholder="Recherche" onChange={this.handleFilterTextChange} onKeyDown={this.handleKeyDown} className="searchInput" />
                </div>
                <div className="basketUserContainer">

                    {this.props.user.user_name != 'Admin' && <img onClick={this.changeMainToCart} src="src/img/cart.png" alt="panier" className='basketImg'></img>} 
                    {this.props.user.user_name == 'Admin' && <span onClick={this.changeMainToAdd}>+</span>}
                    <div className="headerUser">
                        <DivUser user={this.props.user} changeMainToConnexion={this.changeMainToConnexion} logoutUser={this.logoutUser}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
