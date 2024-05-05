import React, { useState, useEffect } from 'react';
import { URL_API } from '../constantes';
import "../css/leftMenu.css";

function ElementFilterList({ onChange, type, nameList }) {
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState('');

    useEffect(() => {
        let url = URL_API + 'getListElement?type=' + type;
        if(url){
            fetch(url)
            .then(res => res.json())
            .then(data =>  setElements(data))
            .catch(err => console.log(err));
        }
    }, []);

    const handleSelectChange = (event) => {
        const selectedElement = event.target.value;
        setSelectedElement(selectedElement);
        onChange(selectedElement);
    };

    return (
        <div>
            <select value={selectedElement} onChange={handleSelectChange}>
            <option value="">{nameList}</option>
            {elements.map((element, index) => (
                <option key={index} value={element.name}>
                    {element.name}
                </option>
            ))}
            </select>
        </div>  
    );
}

function SortFilterList({ onChange, type, nameList }) {
    const [selectedElement, setSelectedElement] = useState('');

    const handleSelectChange = (event) => {
        const selectedElement = event.target.value;
        setSelectedElement(selectedElement);
        onChange(selectedElement);
    };

    return (
        <div>
            <select value={selectedElement} onChange={handleSelectChange}>
            <option value="0">{nameList}</option>
                <option  value="1">Prix</option>
                <option  value="2">Auteur</option>
                <option  value="3">Nom</option>
            </select>
        </div>  
    );
}

class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAuthor: '',
            selectedCategory: ''
        };
    }

    changeAuthor = (selectedAuthor) => {
        this.setState({ selectedAuthor });
        this.props.changeAuthor(selectedAuthor);
    }

    changeCategory = (selectedCategory) => {
        this.setState({selectedCategory})
        this.props.changeCategory(selectedCategory);
    }

    changeSort = (selectedSort) => {
        this.setState({selectedSort})
        this.props.changeSort(selectedSort);
    }
    
    render() {
        return (
            <div className="leftMenu">
                
                <ElementFilterList onChange={this.changeCategory} type="product_category" nameList="Genre"/>
                <ElementFilterList onChange={this.changeAuthor} type="product_author" nameList="Auteur"/>
                <SortFilterList onChange={this.changeSort} nameList="Trie"/>
                  
            </div>
        );
    }
}

export default LeftMenu;
