Requisitos previos para ejecutar la aplicación.

Primero clonar el repositorio https://github.com/KevinCastillo839/ExpoAPP.git

Antes de ejecutar la aplicación, asegúrate de cumplir con los siguientes pasos:

📱 Frontend (Expo - React Native)

Navega a la carpeta del proyecto Expo:

cd CourseAPP

Instala las dependencias necesarias:

npm install

Inicia el proyecto en modo desarrollo:

npm start

Abre el proyecto en un emulador o dispositivo físico con la app Expo Go. Puedes escanear el código QR que aparece en la consola o navegador.

🌐 Backend (Node.js + MySQL)
Asegúrate de tener instalado un motor de base de datos MySQL y que esté en ejecución.

Importa el archivo coursedb.sql para crear la base de datos y las tablas necesarias.

Navega a la carpeta del backend:

cd CourseAPP-backend

Instala las dependencias del servidor:

npm install

Asegúrate de que tu base de datos MySQL esté corriendo y configurada correctamente.

Inicia el servidor:

npm start

⚠️ Importante: Conexión móvil y backend

Si estás ejecutando el frontend en un dispositivo físico, debes modificar la IP en el archivo ConfigIp en el código para que coincida con la IP local de tu PC.Ejemplo:

// En el frontend
const  apiUrl: 'http://192.168.100.158:8080' // Reemplaza con la IP de tu máquina

