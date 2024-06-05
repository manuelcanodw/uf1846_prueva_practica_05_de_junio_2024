// cargar los modulos que vamos a usar, express, mysql y path
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// inciacion de las rutas
const router = express.Router()

// parametros para la conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'uf1846'
});


// aqui 
let departamentos = [];
const selectDepartamentos = "SELECT DISTINCT(departamento) FROM team GROUP BY departamento"
connection.query(selectDepartamentos, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(result);
        departamentos = result;
    }
});

// ruta RAIZ donde podemos encontrar el inicio y el directorio 

    router.get('/', (req, res) => {
        
        const selectAll = "SELECT * FROM team"
        connection.query(selectAll, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);
                res.render("index", {h2 : "Nuestro equipo", result, departamentos})
            }
        });
    });

//ruta para departamento

// Ruta departamento
router.get('/departamento/:departamento', (req, res) => {
    const departamento = req.params.departamento
    const selectDepartamento = `SELECT * FROM team WHERE departamento = '${departamento}'`
    connection.query(selectDepartamento, (err, result) => {
 
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0) {
                res.render('error', { departamentos })
            }
            res.render('index', { h2: 'Nuestro equipo', result, departamentos })
        }

    })
    
})

router.get('/team/:apellido', (req, res) => {
    const team = req.params.apellido
    const selectTeam = `SELECT * FROM team WHERE apellido = '${team}'`
    connection.query(selectTeam, (err, result) => {
 
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0) {
                res.render('error', { departamentos })
            }
            res.render('index', { h2: 'Nuestro equipo', result, departamentos })
        }

    })
})
module.exports = {router, departamentos}