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

app.listen(8081, () => {
    console.log("listening");
})


