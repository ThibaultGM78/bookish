import React, { useState } from 'react';
import { URL_API } from '../constantes';

const AddProduct = ({changeMainToAccueil}) => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: null // Changer image en null pour stocker l'image sélectionnée
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0] // Stocker le fichier sélectionné dans l'état
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    convertImageToBase64(formData.image)
    .then(img => {
        console.log("VALEUR" + img);

        let url =
        URL_API +
        'addProduct?name=' +
        formData.name +
        '&author=' +
        formData.author +
        '&price=' +
        formData.price +
        '&category=' +
        formData.category +
        '&stock=' +
        formData.stock +
        '&desc=' +
        formData.description +
        '&img=' +
        img;
        console.log(url);
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
            changeMainToAccueil();
            })
            .catch(error => {
            console.error('Error:', error);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        console.log(base64String);
        resolve(base64String);
      };
      reader.onerror = error => {
        console.error('Erreur lors de la conversion de l\'image en base64 :', error);
        reject(error); // En cas d'erreur, retourne null ou une valeur par défaut
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label>Nom:</label></td>
            <td><input type="text" name="name" value={formData.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Auteur:</label></td>
            <td><input type="text" name="author" value={formData.author} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Prix:</label></td>
            <td><input type="number" name="price" value={formData.price} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Catégorie:</label></td>
            <td><input type="text" name="category" value={formData.category} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Stock:</label></td>
            <td><input type="number" name="stock" value={formData.stock} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Description:</label></td>
            <td><textarea name="description" value={formData.description} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Image:</label></td>
            <td><input type="file" name="image" onChange={handleChange} required accept="image/*" /></td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddProduct;
