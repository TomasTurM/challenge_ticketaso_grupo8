# Challenge Ticketaso - Grupo 8

Repositorio del grupo 8 para entrega del Challenge Ticketaso, conformado por participantes del Curso XAcademy QA Automation 

Este repositorio contiene una serie de pruebas automatizadas realizadas con **Cypress**.  
El  objetivo es poner en práctica la elaboración de planes de prueba y la automatización 
de casos funcionales con Cypress, aplicando buenas prácticas de reporte de defectos.
Las pruebas se realizaran en la pagina web de Ticketaso 
- [link QA](https://vps-3696213-x.dattaweb.com/).
- [link Produccion](https://ticketazo.com.ar).

## 🚀 Requisitos
- npm
- Node.js >= 22.18.0
- Cypress >= 15.1.0

## 📦 Instalación
Clonar el repositorio y luego instalar las dependencias:

```bash
git clone https://github.com/TomasTurM/challenge_ticketaso_grupo8
cd challenge_ticketaso_grupo8
npm install
```

## ▶️ Ejecución de tests

- Para abrir la interfaz gráfica de Cypress:
```bash
npx cypress open
```

- Para correr los tests en consola (modo headless):
```bash
npx cypress run
```

## 🔑 Tests disponibles

Los test cases estan disponibles para ver en el siguiente link

[Planilla de Plan de Pruebas (Google Spreadsheets)](https://docs.google.com/spreadsheets/d/1hQVeDdiBqR1mtWfs-KDt2vLJZ8Ix0Yo6/edit?usp=sharing&ouid=117098021920744709897&rtpof=true&sd=true)

[Tablero de Trello](https://trello.com/b/PTYfUdfS/trello-challenge-grupo-8)

### 1. Registro Usuario
Pruebas relacionadas con el flujo de creación de nuevos usuarios.

- **Registro exitoso**  

- **Contraseña incorrecta**  

- **Campos sin completar**  

- **Campos sin completar**  

- **Email ya registrado**  

- **Email invalido**  

- **DNI ya registrado**  

- **DNI invalido**  

- **DNI solo numérico**  

- **DNI invalido (menor a 8 digitos)**  

- **DNI invalido (mayor a 8 digitos)**  

- **Numero de telefono invalido**  

- **Edad mínima no complida (>18)**  

- **Confirmación de mail errónea**  

- **Contraseña errónea con menos de 8 digitos**  

- **Contraseña errónea sin caracter especial y numero**  

### 2. Login Usuario 
Pruebas relacionadas con el flujo de autenticación de usuarios.

- **Login exitoso**  

- **Validar campo de email**  

- **Validar campos email y contraseña (no vacios)**  

- **Validar link recuperacion de contraseña**  

- **Validar link creación de nuevo usuario**  

- **Validar link creación de nuevo organizador**  

- **Mail incorrecto**  

- **Contraseña incorrecta**  

### 3. Perfil Usuario
Pruebas relacionadas con los perfiles de usuarios.

- **Cambiar contraseña**  

### 4. Perfil Establecimiento/Organizador de Eventos 
Pruebas relacionadas con los perfiles de usuarios organizadores o establecimientos.

- **Cambiar datos de perfil**  

### 5. Filtros/Buscador de Eventos 
Pruebas relacionadas con las funcionalidades de navegación, filtro y busqueda de entradas, presentes en la pagina principal.

- **Acceso publico navegacion**  

- **Filtrar por nombre**  

- **Filtrar por categoria**  

- **Filtrar por fecha**  

- **Filtrar por provincia y localidad**  

- **Filtrar por cercanía**  

- **Limpiar filtros**  

- **Provinicas sin eventos**  

- **Modo oscuro / Modo Claro**  

### 6. Compra de Entradas 
Pruebas relacionadas con el flujo de compra para entradas de eventos.

- **Comprar exitosa de entradas de estadio (lista de sectores)**  

- **Limite de entradas (lista de sectores)**  

- **Comprar exitosa de entradas de estadio (mapa de sectores)**  

- **Limite de entradas (mapa de sectores)**  

- **Carrito vacío**  

- **Pago rechazado**  

- **Cálculo dinámico del total**  

- **Verificar resumen de compra**  

- **Aceptar términos antes de pagar**  

- **Redirección correcta a MercadoPago**  

- **Comprar múltiples tipos de entrada**  

#### 📝 Notas 
Hay dos modos presentes en Ticketaso para elegir entradas: 

- **Lista de sectores**: muestra las entradas disponibles en una lista
- **Mapa de sectores**: muestra graficamente los sectores disponibles del evento, 
permitiendo al usuario poder visualizar las instalaciones y poder elegir a que zona ir

### 7. Cargar evento organizador  
Pruebas relacionadas con el flujo de autenticación de usuarios. 

- **Cargar evento como organizador (caso exitoso)**  

--- 

## 👨‍💻 Integrantes Grupo 8: Celeste Cordoba

- Adriana Lopez de Mara
- Ezequiel
- Fabian Monier
- Franco Vinci
- Gaston
- Tiago Viezzoli
- Tomas Monier