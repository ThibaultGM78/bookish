import React, { Component } from 'react';
import { URL_API } from '../constantes';
import Accueil from './accueil';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordsMatch: true,
            userExist: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword } = this.state;
  
        if (password === confirmPassword) {

            let url = URL_API + 'signUp?name=' + name + '&email=' + email + '&password=' + password;
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
    
                    console.log(data, data.success);

                    if(data.success){
                        this.props.changeMainToConnexion("changeMainToConnexion");
                    }
                    else{
                        this.setState({ userExist: true});
                    }
                    
                })
                .catch(error => {
                 
                });   
            }
        } else {

            this.setState({ passwordsMatch: false });
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { name, email, password, confirmPassword, passwordsMatch, userExist } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Nom :</label></td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email :</label></td>
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
                            <td><label htmlFor="password">Mot de passe :</label></td>
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
                        <tr>
                            <td><label htmlFor="confirmPassword">Confirmer le mot de passe :</label></td>
                            <td>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        {!passwordsMatch && <tr><td colSpan="2" style={{ color: 'red' }}>Les mots de passe ne correspondent pas.</td></tr>}
                        {userExist && <tr><td colSpan="2" style={{ color: 'red' }}>Ce nom d'utilisateur ou cette adresse mail sont déjà pris</td></tr>}
                    </tbody>
                </table>
                <button type="submit">Créer un compte</button>
            </form>
        );
    }
}

export default SignUpForm;
