# delilahresto
DELILAH RESTO

Este proyecto es sobre una api donde podes manejar una lista de usuarios, ordenes y productos de un restaurante. Esta conectada a una base de datos
de MySQL donde se guarda la información.

 # 1er Paso. 
Clona este repositorio o baja directamente el zip desde github.
https://github.com/eugeniamr/delilahresto.git

 # 2do Paso.
Estas son las dependencias usadas

"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.5.0",
    "jwt-simple": "^0.5.6",
    "moment": "^2.26.0",
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.12"
}

con npm install o yarn install se pueden instalar.

# 3er Paso.

Configurar la base de datos:
Esta api va a iniciar una base de datos llamada "delilahresto" y se puede configurar desde la carpeta dbConfg.js. 

# 4to Paso.

Hacer correr la api:
Inicia el servidor de MySQL. En este caso usamos XAMMP Control Panel e iniciá apache y MySQL.
Luego correremos node usando el comando node index.js o nodemon usando nodemon index.js.
Esto iniciara la api en el puerto 3000, se podra visualizar en la consola el mensaje "Welcome to Delilah Resto"

# 5to Paso.
Para testear la api:
Recomiendo usar postman.

# MIDDLEWARES

checkToken: Cuando el user realicé el Login la api generara automaticamente un JWT User Token. Tiene que copiar ese token
y usarlo cada vez que es requerido poniendolo en el header de la request con la key "user-token". El token tiene una duracion de una hora,
despues de eso el usuario se tiene que volver a loguear y generar un token nuevo.

isAdmin:  Este middleware se usa para chequear si el usuario tiene permiso para realizar ciertas acciones. En el caso de que los tenga
en el body request(en formato JSON) deberias poner "role": "admin", en caso de omitir esto el usuario no tendra permiso de administrador y no podra realizar las acciones
requeridas.

# USUARIO GUARDADO.
La base de datos viene con un usuario guardado que se puede utilizar para realizar las pruebas. En el body request utilizando el endpoint de login mandar "username": "eugenia", "password":"holi", "email": "euge@gmail.com" y en caso
de querer desempeñar acciones de admin tambien mandar "role": "admin". 

# ENDPOINTS 

# USERS

POST - Registrar un user.

http://localhost:3000/api/users/register

Body request: username, password, firstname, lastname, email, address

POST - Login.

http://localhost:3000/api/users/login

Body request: username, password, email

GET - Obtener todos los users.

http://localhost:3000/api/users/allUsers

Middlewares necesarios: checkToken, isAdmin

GET - Obtener un user.

http://localhost:3000/api/users/:userId

Middlewares necesarios: checkToken

PUT - Editar un user.

http://localhost:3000/api/users/:userId

Middlewares necesarios: checkToken, isAdmin Body request: Edit the key you can to edit

DELETE - Borrar un user.

http://localhost:3000/api/users/:userId

Middlewares necesarios: checkToken, isAdmin

# PRODUCTS.

GET - Obtener todos los productos

http://localhost:3000/api/products/

No se necesitan middlewares.

GET - Obtener un producto.

http://localhost:3000/api/products/:productId

No se necesitan middlewares.

POST - Generar un producto.

http://localhost:3000/api/products/

Middelwares required: checkToken, isAdmin Body request: product_name, product_price

PUT - Editar un producto.

http://localhost:3000/api/products/:productId

Middlewares necesarios: checkToken, isAdmin Body request: Edit the key you can to edit

DELETE - Borrar un producto.

http://localhost:3000/api/products/:productId

Middlewares necesarios: checkToken, isAdmin

# ORDERS.

GET - Obtener todas las orders.

http://localhost:3000/api/orders/

Middlewares necesarios: checkToken, isAdmin

GET - Obtener una order.

http://localhost:3000/api/orders/:orderId

Middlewares necesarios: checkToken, isAdmin

POST - Generar una order.

http://localhost:3000/api/order/

Middlewares necesarios: checkToken Body request: order_description, payment_method, order_amount

PUT - Editar una order.

http://localhost:3000/api/orders/:orderId

Middlewares necesarios: checkToken, isAdmin Body request: Edit the key you can to edit

DELETE - Borrar una order.

http://localhost:3000/api/orders/:orderId

Middlewares necesarios: checkToken, isAdmin
