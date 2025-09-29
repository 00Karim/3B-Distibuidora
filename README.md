#### PROYECTO FINAL INTEGRADOR - Karim Vélez y Franco Baudrix

Link de Jira: https://bixve.atlassian.net/jira/software/projects/TRES/boards/34?atlOrigin=eyJpIjoiODFhMzJhM2E1YTlkNDYyNDk5ZTQ0YjgzYWJmYTg3NmEiLCJwIjoiaiJ9
Link de github: https://github.com/00Karim/3B-Distibuidora

##### Software para manejo de ventas y stock para la distribuidora 3B.

Estamos contratados para desarrollar un software para la empresa distribuidora 3B (Brasil 977) que los ayude a organizar sus ventas y su stock.
Actualmente, 3B maneja sus pedidos por Whatsapp lo cual limita mucho su capacidad de organización y requiere de mucha atención y energía para evitar cometer errores, ya que con frecuencia los clientes solicitan productos mal escritos o cantidades mal formuladas, a veces directamente imposibles de proveer, o con productos sin stock. 
Por otro lado, este sistema también le trae problemas e ineficiencia a los empleados que tienen que estar constantemente mirando un grupo de Whatsapp para poder armar los pedidos, tienen que llevar un registro mental de los ítems ya agregados y los que faltan. Tener ese registro mental como soporte hace que sean muy comunes los errores, no por incompetencia de los empleados, sino por las flaquezas del sistema en cuanto al soporte al empleado. 
Por último, esta empresa no tiene un registro de stock. Actualmente, unas veces por semana, se le asigna a un empleado la tarea de ir al depósito a chequear la cantidad de cada producto lo cual, evidentemente, es muy ineficiente y propenso a errores.
Un sistema que no presente todos estos problemas aumentaria la productividad tanto de los empleados que arman los pedidos en el depósito como de los que tienen un rol más administrativo y reciben los pedidos de los clientes y se los comunican a sus compañeros porque podrían centrarse completamente en su labor en mano en vez de centrarse en si el cliente hizo el pedido correctamente, si faltan cosas cosas por agregar, etc.
La solución que planteamos a todo esto es un software de gestión de pedidos y registro de stock. Vamos a tener 3 interfaces de usuario diferentes para los 3 tipos de usuarios que van a usar el software: Empleados, Administradores (dueños) y  clientes.
Los clientes van a hacer sus pedidos interactuando con 3 páginas distintas. El inicio, donde van a ver promociones, nuevos productos, categorías de productos, entre otros. La página de contacto, donde se detalla la información de contacto de la empresa. Finalmente, la página para crear un pedido donde se muestran los productos que hay en stock y sin stock y le da al usuario la opción de filtrar por categoría o nombre.
Los administradores pueden crear, editar o eliminar productos, pueden ver los pedidos o cambiar su estado (entregado, pendiente, etc), crear usuarios para que los usen los empleados o administradores dependiendo de las necesidades del dueño y también pueden ver y manejar el stock.  
Los empleados pueden ver los pedidos, pueden cambiar el estado de los pedidos de pendiente a en curso y de en curso a completado y además pueden buscar pedidos con distintos filtros. 

##### DESCRIPCIÓN ESTRUCTURAL
El software va a estar compuesto por un backend desarrollado en Node.js con JavaScript, una base de datos en MongoDB, una API para acceder a la BDD con Express, un frontend en React, testing hecho con Jest y va a estar alojado en Render

##### DESCRIPCION BDD
En total, vamos a trabajar con 8 entidades. Order, User, Client, Address, PackagingType, Item, Product y Category.

<ins>Order</ins>

Order va a ser la entidad más importante de la base de datos.
En ella se unifica la información de las demás entidades para representar el pedido de un cliente.
Contiene datos sobre los ítems solicitados, el usuario que lo gestionó, el cliente, el estado del pedido, la forma de entrega, los empleados asignados, la fecha de creación y entrega, y la forma de empaquetado.

<ins>User</ins>

User representa a los empleados o administradores que interactúan con el sistema.
Guarda información personal y de autenticación como email, contraseña, nombre, además de su rol (admin o empleado) y la fecha de creación de la cuenta.
Es fundamental para la gestión interna de los pedidos.

<ins>Client</ins>

Client almacena la información de los clientes que realizan pedidos.
Incluye datos de contacto como nombre, número de WhatsApp, email, DNI y su dirección.
Está relacionado con Order, ya que cada pedido pertenece a un cliente.

<ins>Address</ins>

Address detalla la dirección física de un cliente.
Incluye datos como calle, número, ciudad, provincia/estado y código postal.
Se utiliza para poder realizar envíos a domicilio o validar la ubicación en métodos de entrega específicos.

<ins>Product</ins>

Product representa cada uno de los productos ofrecidos en la distribuidora.
Contiene datos como nombre, precio, imagen, descripción, stock, marca, categoría, unidad de medida y si es aptos sin gluten.
Es la base de los ítems que componen un pedido.

<ins>Category</ins>

Category organiza los productos en grupos y subgrupos.
Cada categoría tiene un nombre y puede contener subcategorías.
Facilita la navegación y clasificación de los productos en el sistema.

<ins>Item</ins>

Item representa un producto concreto dentro de un pedido.
Incluye información como el producto asociado, nombre, cantidad, precio por unidad, precio total, peso, disponibilidad y observaciones.
Es la forma en que los productos se agregan a una orden de compra.

<ins>PackagingType</ins>

PackagingType especifica el tipo de empaque en el que se entregan los productos.
Puede ser bolsa, caja o directamente el empaque de fábrica, por ejemplo una bolsa entera de harina.
Cada packaging incluye el tipo y la cantidad utilizada en una orden



##### DIAGRAMA DE LA BASE DE DATOS
!["Diagrama BDD"](./assets/3B%20Database%20.jpeg)

