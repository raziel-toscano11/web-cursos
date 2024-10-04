const express = require('express');
const app = express();

app.set('appName', 'Aplicacion Web Cursos');
app.set('port', 3000);
app.set('case sensitive routing', true);

app.get('/isAlive', (req, res) => {
    res.sendStatus(204);//Comprueba si el servidor esta funcionando
}); 

//Rutas para Autenticacion
app.post('/login', (req, res) => {
    res.send('Ruta de inicio de sesion');
});

app.post('/register', (req, res) => {
    res.send('Ruta de registro de usuario');
});

app.post('/logout', (req, res) => {
    res.send('Ruta de cierre de sesion');
});

//Rutas de Cursos
//Rutas que no requieren autenticacion
app.get('/cursos', (req, res) => {
    res.send('Ruta que devuelve los cursos disponibles');
});

app.get('/cursos/:id', (req, res) => {
    res.send('Ruta que devuelve un curso especifico');
});

app.get('/planes', (req, res) => {
    res.send('Ruta que devuelve los planes de pago disponibles');
});

//Rutas que requieren atenticacion
app.get('cursos/mis-cursos', (req, res) => {
    res.send('Ruta que devuelve los cursos que ha comprado el usuario');
});

app.get('cursos/:id/seccion/:n', (req, res) => {
    res.send('Ruta que devuelve una seccion especifica de un curso');
});

//Rutas de Usuarios (Estudiante y Profesor)
app.get('/users/perfil', (req, res) => {
    res.send('Ruta que devuelve el perfil del usuario logeado');
});

app.put('/users/perfil/editar', (req, res) => {
    res.send('Ruta para editar el perfil del usuario logeado');
});

app.get('/users/:id', (req, res) => {
    res.send('Ruta que devuelve el perfil de otro usuario');
});

//Rutas de Usuarios (Profesor)
app.post('/cursos', (req, res) => {
    res.send('Ruta para crear un nuevo curso');
});

app.put('/cursos/:id', (req, res) => {
    res.send('Ruta para editar un cursos');
});

app.delete('/cursos/:id', (req, res) => {
    res.send('Ruta para eliminar un curso'); //Pendiente a revision
});

app.get('/users/cursos/creados', (req, res) => {
    res.send('Ruta que duelve los cursos creados por un profesor');
});

//Rutas de pagos
app.get('/users/metodos-pago', (req, res) => {
    res.send('Ruta que devuelve los metodos de pago del usuario');
});

app.post('/users/metodos-pago', (req, res) => {
    res.send('Ruta que crea un nuevo metodo de pago del usuario');
});

app.put('/users/metodos-pago/:id', (req, res) => {
    res.send('Ruta que edita un metodo de pago del usuario');
});

app.delete('/users/metodos-pago/:id', (req, res) => {
    res.send('Ruta que elimina un metodo de pago del usuario');
});

app.get('/pago/confirmacion', (req, res) => {
    res.send('Ruta que devuelve una confirmacion de pago exitosa');
});

app.post('/cursos/:id/pagar', (req, res) => {
    res.send('Ruta para realizar el pago de un curso');
});

app.listen(app.get('port'));
console.log(`Server ${app.get('appName')} running on port ${app.get('port')}`);