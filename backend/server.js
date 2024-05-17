const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookish"
})

app.get('/', (re,res) => {
    return res.json("From Backend Side");
})

//Exemple: /getProduct?vTrie=value&auteur=value&category=value&search=value
app.get('/getProductsList', (req, res) => {

    var { title ,author, category, search, sort } = req.query;
    
    var partTarget = '';
    var partSearch = '';
    var sql = "SELECT * FROM bookish_product "

    function addToPartTarget(column,value,partTarget){

        if(partTarget != ''){
            partTarget += 'AND '
        }
        partTarget += column + " = '" + value + "' ";

        return partTarget
    }
    function addToPartSearch(column,value,partSearch){
        if(partSearch != ''){
            partSearch += 'OR '
        }
        partSearch += column + " LIKE '%" + value + "%' ";

        return partSearch
    }

    if( author || category || search){
        if(title){
            partTarget = addToPartTarget('product_name',title,partTarget);
        }
        else if(search){
            partSearch = addToPartSearch('product_name',search,partSearch)
        }

        if(author){
            partTarget = addToPartTarget('product_author',author,partTarget);
        }
        else if(search){
            partSearch = addToPartSearch('product_author',search,partSearch)
        }

        if(category){
            partTarget = addToPartTarget('product_category',category,partTarget);
        }
        else if(search){
            partSearch = addToPartSearch('product_category',search,partSearch)
        }

        sql += "WHERE " + partTarget;
        if(partSearch != ''){
            if(partTarget != ''){
                sql += "AND "
            }
            sql += "(" + partSearch + ")"
        }
    }
    else{
        
    }

    switch (sort){
        case '1':
            sql += "ORDER BY product_price"
            break;
        case '2':
            sql += "ORDER BY product_author"
            break;
        case '3':
            sql += "ORDER BY product_name"
            break;
        default:
            break;   
    }

    console.log(sql);
    db.query(sql, [title,author,category], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(data);
    });
   
  });

app.get('/getListElement', (req, res) => {

    var { type } = req.query;

    var sql = 'SELECT DISTINCT ' + type + ' AS name FROM bookish_product ORDER BY ' + type;

    console.log(sql);
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(data);
    });
   
});

app.get('/getConnexion', (req, res) => {
    var { email, password } = req.query;

    var sql = "SELECT * FROM bookish_user WHERE user_email = ? AND user_password = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(data);
    });
});


app.get('/signUp', (req, res) => {
    var { email, password, name } = req.query;

    // Vérifier si un utilisateur avec le même nom existe déjà
    var sqlCheckName = "SELECT * FROM bookish_user WHERE user_name = ? OR user_email = ?";
    db.query(sqlCheckName, [name, email], (err, nameData) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (nameData.length > 0) {
            return res.json({ success: false, message: 'User with the same name already exists' });
        }

        // Si aucun utilisateur avec le même nom n'existe, insérer les données
        var sqlInsert = "INSERT INTO bookish_user (user_name, user_email, user_password) VALUES (?, ?, ?)";
        db.query(sqlInsert, [name, email, password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ success: true, message: 'User created successfully' });
        });
    });
});

app.get('/insertContact', (req, res) => {
    var { dateContact, name, surname, email, genre, birthday, role, subject, content} = req.query;
    console.log("helloo");

    var sqlInsert = "INSERT INTO bookish_contact (contact_date, contact_name, contact_surname, contact_email, contact_gender, contact_birthday, contact_function, contact_subject, contact_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [dateContact, name, surname, email, genre, birthday, role, subject, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ success: true, message: 'Contact etblished successfully' });
    });
    
});

app.get('/insertPayment', (req, res) => {
    var { cart, adresse, city, code, user} = req.query;
  
    var total = 0;
    cart = cart.replace(/\\/g, '');
    const cartJson = JSON.parse(cart);
  
   for (var i in cartJson){
    
        total += cartJson[i].nElement * cartJson[i].value;
        var sqlUpdate = "UPDATE bookish_product SET product_stock = product_stock - ? WHERE id_product = ?";
        db.query(sqlUpdate, [cartJson[i].nElement, cartJson[i].key], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                // Gérer la réponse de la requête si nécessaire
            })
    }
    
    const date = new Date();

    // Obtenir la date du jour
    const day = date.getDate();
    // Obtenir le mois (attention : les mois commencent à partir de 0)
    const month = date.getMonth() + 1;
    // Obtenir l'année
    const year = date.getFullYear();

    dateStr = day + "/" + month + "/" + year;
    
    var sqlInsert = "INSERT INTO bookish_payment(id_user, payment_date, payment_adresse, payment_city, payment_code, payment_total, payment_cart)"
    + "VALUES (" + user + ",'" + dateStr +"','" + adresse + "','" + city +"','" + code + "'," + total + ",'" + cart + "')";
    db.query(sqlInsert, [], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error caca' });
        }
        res.json({ success: true, message: 'Contact etblished successfully' });
    });
    
});


app.listen(8081, () => {
    console.log("listening");
})
