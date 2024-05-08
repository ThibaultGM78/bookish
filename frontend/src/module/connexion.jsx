import React from "react";
import { URL_API } from '../constantes';
import SignUpForm from "./signUpForm";

class Connexion extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isCorrect: true
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let url = URL_API + 'getConnexion?email=' + this.state.email + '&password=' + this.state.password;
        if (url) {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to connect');
                    }
                    return res.json();
                })
                .then(data => {
                    
                    if (!data) {
                        throw new Error('Invalid credentials');
                    }        

                    this.props.changeUser(data[0]);            
                    
                })
                .catch(error => {
                    this.setState({ isCorrect: false});
                    
                });
                
        }

    };

    changeMainToSignUp = (event) => {
       this.props.changeMainToSignUp(" changeMainToSignUp");
    }

    render() {
        const { email, password, isCorrect } = this.state;
    
        return (
            <div className="connexion">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2"><h2>Connexion</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Mot de passe:</label></td>
                            <td>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        {!isCorrect && <tr><td colSpan="2" style={{ color: 'red' }}>L'adresse mail ou le mot de passe n'est pas correct</td></tr>}
                    </tbody>
                </table>
                <button type="submit" onClick={this.handleSubmit}>Se connecter</button>
                <button type="submit" onClick={this.changeMainToSignUp}>Creer un compte</button>
            </div>
        );
    }
    
}

export default Connexion;
