import React from "react";
import "../css/contact.css";
import { URL_API } from '../constantes';
import Accueil from "./accueil";

function Field({name, value, onChange, children,error}){
    return <tr>
        <th>
            <label htmlFor={name}>{children}</label>
        </th>
        <th>
            <input type="texte" value={value} onChange={onChange} id={name} name={name}></input>
        </th>
        <th id={name + "Error"} className="noAlert">
            Veuillez saisir un {error} valide
        </th>
    </tr>
}
function DateField({name, value, onChange, children}){
    return <tr>
        <th>
            <label htmlFor={name}>{children}</label>
        </th>
        <th>       
            <input type="date" value={value} onChange={onChange} id={name} name={name}></input>
        </th>
        <th id={name + "Error"} className="noAlert">
            Veuillez saisir une date valide
        </th>

    </tr> 
}


class Contact extends React.Component{
    //Prop
    constructor(props){
        super(props)
        this.state = {
            dateContact: '',
            name: '',
            surname: '',
            email: '',
            genre: '',
            birthday: '',
            role: 'enseignant',
            subject: '',
            content: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //Function
    handleChange(e){
        const name = e.target.name//nom du chp modifie
        const type = e.target.type//type du champ
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)

        var isOk = true;

        if(!this.state.dateContact){
            document.getElementById("dateContactError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("dateContactError").className = "noAlert";
        }

        if(this.state.name.length == 0){
            document.getElementById("nameError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("nameError").className = "noAlert";
        }

        if(this.state.surname.length == 0){
            document.getElementById("surnameError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("surnameError").className = "noAlert";
        }

        /*if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            document.getElementById("emailError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("emailError").className = "noAlert";
        }*/

        if(this.state.genre.length == 0){
            document.getElementById("genreError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("genreError").className = "noAlert";
        }

        if(!this.state.birthday){
            document.getElementById("birthdayError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("birthdayError").className = "noAlert";
        }

        if(this.state.subject.length == 0){
            document.getElementById("subjectError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("subjectError").className = "noAlert";
        }

        if(this.state.subject.length == 0){
            document.getElementById("contentError").className = "alert";
            isOk = false;
        }
        else{
            document.getElementById("contentError").className = "noAlert";
        }

        if (isOk) {

            let url = URL_API + 'insertContact?' ;
            url += 'dateContact=' + this.state.dateContact + '&';
            url += 'name=' + this.state.name + '&';
            url += 'surname=' + this.state.surname + '&';
            url += 'email=' + this.state.email + '&';
            url += 'genre=' + this.state.genre + '&';
            url += 'birthday=' + this.state.birthday + '&';
            url += 'role=' + this.state.role + '&';
            url += 'subject=' + this.state.subject + '&';
            url += 'content=' + this.state.content;

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
                        console.log("fdsfsf");
                        this.props.changeMain(<Accueil/>);
                    }
                    
                })
                .catch(error => {
                 
                });   
            }
        }

    }
    //Render
    render(){
        return <form className="container" onSubmit={this.handleSubmit}>
            <table>
                <tbody>
                    <DateField name="dateContact" value={this.state.dateContact} onChange={this.handleChange}>Date de contact :</DateField>
                    <Field name="name" value={this.state.name} onChange={this.handleChange} error="nom">Nom :</Field>
                    <Field name="surname" value={this.state.surname} onChange={this.handleChange} error="prenom">Prenom :</Field>
                           
                    <tr>
                        <th>
                            <label htmlFor="email">Email :</label>
                        </th>
                        <th>
                            <input type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email"></input>
                        </th>
                        <th id="emailError" className="noAlert">
                            Veuillez saisir un email valide
                        </th>
                    </tr>
                
                    <tr>
                        <th>
                            <label htmlFor="genre">Genre :</label>
                        </th>
                        <th>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="man" name="genre" value="homme" onChange={this.handleChange} className="form-check-input" />
                                <label htmlFor="man" className="form-check-label">Homme</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="women" name="genre" value="femme" onChange={this.handleChange} className="form-check-input" />
                                <label htmlFor="women" className="form-check-label">Femme</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" id="other" name="genre" value="autre" onChange={this.handleChange} className="form-check-input" />
                                <label htmlFor="other" className="form-check-label">Autre</label>
                            </div>
                        </th>
                        <th id="genreError" className="noAlert">
                            Veuillez cocher un genre
                        </th>
                    </tr>
               
                    <DateField name="birthday" value={this.state.birthday} onChange={this.handleChange}>Date d'anniversaire :</DateField>
                       
                    <tr>
                        <th>
                            <label htmlFor="role">Fonction :</label>
                        </th>
                        <th>
                            <select id="role" name="role" value={this.state.role} onChange={this.handleChange}>
                                <option value="enseignant">Enseignant</option>
                                <option value="etudiant">Etudiant</option>
                                <option value="autre">Autre</option>
                            </select>
                        </th>  
                    </tr>
                
                    <Field name="subject" value={this.state.subject} onChange={this.handleChange} error="sujet">Sujet :</Field>

                    <tr>
                        <th>
                            <label htmlFor="content">Content :</label>
                        </th>
                        <th>
                            <textarea rows="5" cols="33" value={this.state.content} onChange={this.handleChange} id="content" name="content">
                                Tapez ici votre mail
                            </textarea>
                        </th>
                        <th id="contentError" className="noAlert">
                            Veuillez nous faire part de votre remarque
                        </th>
                    </tr>              
                </tbody>
            </table>
            <div className="form-group">
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
        
    }
}

export default Contact;