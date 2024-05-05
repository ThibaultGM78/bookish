import React from "react";
import Contact from "./contact";

class Footer extends React.Component{

    changeMain = (balise) => {
        this.props.changeMain(balise);
    };
    
    render(){
        return (
            <div className="footer">
                <img src="src/img/logo.jpeg" alt="logo" className="footerLogo" />
                <p className="footerAbout">
                    <strong>A Propos</strong>
                    <a href="#" className="nav-link" onClick={() => this.changeMain(<Contact changeMain={this.props.changeMain}/>)}>Contactez nous</a>
                </p>
            </div>
        );
    }
}

export default Footer;