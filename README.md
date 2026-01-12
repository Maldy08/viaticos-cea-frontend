# Viáticos CEA - Frontend

Este es el repositorio del **Frontend** para el Sistema de Gestión de Viáticos de la **Comisión Estatal del Agua de Baja California (CEA)**.

El proyecto es una Single Page Application (SPA) moderna diseñada para facilitar la captura, administración, seguimiento y generación de reportes (PDF) de los viáticos de los empleados.

## 🚀 Tecnologías Utilizadas

El proyecto está construido con un stack tecnológico robusto y moderno:

* **Core:** [React](https://reactjs.org/) (v18) con [TypeScript](https://www.typescriptlang.org/).
* **Build Tool:** [Vite](https://vitejs.dev/) para un entorno de desarrollo rápido y optimizado.
* **Manejo de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/) (Slices para Auth, Viáticos, Empleados, etc.).
* **Enrutamiento:** [React Router DOM](https://reactrouter.com/) (v6).
* **Estilos y UI:** [Bootstrap 5](https://getbootstrap.com/) y [FontAwesome](https://fontawesome.com/).
* **Peticiones HTTP:** [Axios](https://axios-http.com/).
* **Generación de PDF:** [jsPDF](https://github.com/parallax/jsPDF) para la creación de recibos y formatos oficiales en el navegador.
* **Alertas:** [SweetAlert2](https://sweetalert2.github.io/).

## 📋 Funcionalidades Principales

* **Autenticación:** Login seguro para usuarios administrativos.
* **Captura de Viáticos:** Formulario dinámico para registrar solicitudes de viaje, calculando importes por días y zonas.
* **Gestión de Catálogos:** Administración de Departamentos, Empleados, Oficinas, etc.
* **Generación de Documentos:**
    * Recibo de Viáticos.
    * Informe de Actividades.
    * Formato de Comisión.
* **Historial:** Listado y visualización de viáticos capturados.
