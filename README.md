# 📖 Biblioteca Virtual UI (Frontend - Next.js)

Una interfaz moderna, responsiva y con estética visualmente impactante (Glassmorphism) para gestionar el sistema de biblioteca.

## ✨ Características
- **Catálogo Dinámico:** Visualización premium de libros disponibles.
- **Sistema de Préstamos:** Modal interactiva para registro de lectores por edad.
- **Tickets Inteligentes:** Generación de códigos únicos de devolución.
- **Gestión de Libros:** Formulario para añadir nuevos títulos al catálogo.
- **Responsive Design:** Optimizado para móviles y escritorio (Mobile First).

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 15+ (App Router)
- **Librería:** React 19+
- **Estilos:** Tailwind CSS 4
- **Lenguaje:** TypeScript

## 🚀 Instalación y Configuración
1. Instala las dependencias:
```bash
npm install
```
2. Inicia el servidor de desarrollo:
```bash
npm run dev
```
3. Abre: `http://localhost:3000`

## 🌍 Variables de Entorno (Deployment)
Para desplegar en la nube (Docker/Azure), configura la variable `BACKEND_URL`:
- `BACKEND_URL`: URL base de tu API en Azure (ej. `http://tu-api.azurewebsites.net`).

## 🐳 Docker
```bash
docker build -t biblioteca-frontend .
docker run -p 3000:3000 -e BACKEND_URL=http://localhost:8080 biblioteca-frontend
```
