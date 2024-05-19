import React, { Component } from 'react';
import { URL_API } from '../constantes';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adresse: '',
            ville: '',
            codePostal: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var data = {};
        var i = 0;
        for (var key in this.props.cart) {
            data[i] = {key: this.props.cart[key].info.id_product, nElement: this.props.cart[key].nElement, value: this.props.cart[key].info.product_price };
            i++
        }


        // Construire l'URL en utilisant les chaînes encodées
        let url = `${URL_API}insertPayment?cart=${encodeURIComponent(JSON.stringify(data))}&adresse=${encodeURIComponent(this.state.adresse)}&city=${encodeURIComponent(this.state.ville)}&code=${encodeURIComponent(this.state.codePostal)}&user=${encodeURIComponent(this.props.user.id_user)}`;

        console.log(url); // 
        
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

                    console.log("COUCOU");
                    this.props.paymentMade();         
                    
                })
                .catch(error => {
                    this.setState({ isCorrect: false});
                    
                })
                
        }

    };

    render() {
        return (
            <div>
                <h1>Formulaire d'adresse de livraison</h1>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Adresse :</th>
                                <td>
                                    <input 
                                        type="text" 
                                        name="adresse" 
                                        value={this.state.adresse} 
                                        onChange={this.handleChange} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Ville :</th>
                                <td>
                                    <input 
                                        type="text" 
                                        name="ville" 
                                        value={this.state.ville} 
                                        onChange={this.handleChange} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Code postal :</th>
                                <td>
                                    <input 
                                        type="text" 
                                        name="codePostal" 
                                        value={this.state.codePostal} 
                                        onChange={this.handleChange} 
                                        required 
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">Valider</button>
                </form>
            </div>
        );
    }
}

export default Payment;