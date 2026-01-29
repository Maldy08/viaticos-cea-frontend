# Sistema de Control de Viáticos

Sistema web para la gestión y control de viáticos de la Comisión Estatal del Agua de Baja California.

## 🏗️ Arquitectura del Proyecto

Este proyecto ha sido refactorizado aplicando los **principios SOLID** para mejorar la mantenibilidad, escalabilidad y testabilidad del código.

### Estructura de Carpetas
```
src/
├── api/                    # Configuración de Axios
├── types/                  # Tipos TypeScript segregados (ISP)
│   ├── common/            # Tipos base compartidos
│   ├── auth/              # Autenticación
│   ├── empleados/         # Empleados
│   ├── viaticos/          # Viáticos y cálculos
│   ├── catalogos/         # Catálogos (deptos, ciudades, etc.)
│   ├── ui/                # Estado de UI
│   └── store/             # Tipos del store Redux
├── services/              # Lógica de negocio y acceso a datos
│   ├── api/              # Cliente HTTP base
│   ├── repositories/     # Patrón Repository (DIP)
│   └── domain/           # Servicios de dominio (SRP, OCP)
├── store/                # Redux slices
├── hooks/                # Custom hooks
│   ├── viaticos/        # Hooks específicos de viáticos
│   └── ...              # Hooks de stores
├── viaticos/            # Módulo de viáticos
│   ├── components/      # Componentes reutilizables
│   │   └── form/       # Componentes del formulario
│   ├── pages/          # Páginas principales
│   └── layout/         # Layouts
└── helpers/            # Utilidades (algunos deprecados)
```

## 🎯 Principios SOLID Aplicados

### ✅ Single Responsibility Principle (SRP)
- Cada componente tiene una única responsabilidad
- Servicios de dominio especializados (`ViaticoCalculator`, `UbicacionValidator`)
- Hooks personalizados con responsabilidades claras

### ✅ Open/Closed Principle (OCP)
- Servicios extensibles sin modificar código existente
- Sistema de tarifas configurable
- Estrategias de cálculo intercambiables

### ✅ Liskov Substitution Principle (LSP)
- Interfaces bien definidas y consistentes
- Implementaciones intercambiables de repositorios

### ✅ Interface Segregation Principle (ISP)
- Tipos segregados por dominio
- Interfaces específicas en lugar de monolíticas
- No se fuerza a implementar métodos innecesarios

### ✅ Dependency Inversion Principle (DIP)
- Hooks dependen de abstracciones (interfaces)
- Repositorios inyectables y mockeables
- Componentes desacoplados de implementaciones concretas

## 🚀 Características Principales

### Servicios de Dominio

#### ViaticoCalculator
Calcula importes de viáticos basándose en:
- Nivel del empleado (1-16, 17-19, 20+)
- Ubicación (dentro/fuera del estado/país)
- Días de comisión
- Tarifas configurables
```typescript
const resultado = viaticoCalculator.calcular({
  dias: 3,
  nivelEmpleado: 15,
  fueraDelEstado: true,
  fueraDelPais: false
});
// resultado.importe, resultado.partida, etc.
```

#### UbicacionValidator
Valida y determina ubicaciones:
```typescript
const validacion = ubicacionValidator.validar(ciudad, estado, pais);
// validacion.fueraDelEstado, validacion.fueraDelPais
```

#### DateUtils
Utilidades para manejo de fechas:
```typescript
DateUtils.calcularDias(fechaInicio, fechaFin);
DateUtils.formatearFecha(fecha);
DateUtils.obtenerNombreMes(fecha);
```

### Patrón Repository

Acceso a datos desacoplado:
```typescript
// Usar repositorio en lugar de llamadas directas a API
const empleados = await empleadosRepository.getByDepto(depto);
const viatico = await viaticosRepository.create(nuevoViatico);
```

### Hooks Personalizados

#### useViaticoForm
Maneja el estado del formulario de viáticos
```typescript
const { initialValues, isModificarViatico } = useViaticoForm(viatico, ...);
```

#### useViaticoCalculation
Cálculos reactivos de viáticos
```typescript
const { calculoActual, calcularViatico } = useViaticoCalculation(...);
```

#### useViaticoSubmit
Lógica de envío del formulario
```typescript
const { submitViatico } = useViaticoSubmit(...);
```

## 📦 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Redux Toolkit** - Gestión de estado
- **Formik + Yup** - Manejo de formularios y validaciones
- **Axios** - Cliente HTTP
- **React Router** - Enrutamiento
- **Bootstrap + Reactstrap** - UI/Componentes
- **React DatePicker** - Selector de fechas
- **Moment.js** - Manejo de fechas

## 🛠️ Scripts Disponibles
```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 📚 Documentación Adicional

- [REFACTORING.md](./REFACTORING.md) - Detalles de la refactorización aplicada
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura detallada del sistema

## 🧪 Testing (Próximamente)
```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:coverage
```

## 📝 Convenciones de Código

### Naming Conventions
- **Componentes**: PascalCase (`ViaticoFormHeader`)
- **Hooks**: camelCase con prefijo `use` (`useViaticoForm`)
- **Servicios**: PascalCase (`ViaticoCalculator`)
- **Tipos/Interfaces**: PascalCase (`ViaticoFormData`)
- **Constantes**: SCREAMING_SNAKE_CASE (`TARIFAS_VIATICOS_2024`)

### Estructura de Archivos
- Un componente por archivo
- Índices de barril (`index.ts`) para exports
- Tipos junto a su implementación
- Tests junto a archivos fuente (`.test.ts`)

## 🔄 Flujo de Datos
```
Usuario → Componente → Hook → Repositorio → API
                ↓         ↓
            Servicio  ←  Redux
            Dominio      Store
```

## 🎨 Componentes Principales

### CapturarViaticos
Página principal refactorizada en 7 componentes:
- `ViaticoFormHeader` - Información del empleado
- `ViaticoFormBasicInfo` - Datos básicos
- `ViaticoFormDates` - Fechas
- `ViaticoFormDestination` - Origen/Destino
- `ViaticoFormContent` - Motivo/Actividades
- `ViaticoFormPartidas` - Tabla de partidas
- `ViaticoFormActions` - Botones de acción

## 🔐 Autenticación

Sistema de autenticación basado en JWT:
- Login con usuario/contraseña
- Token almacenado en localStorage
- Validación de token en cada request
- Logout con limpieza de estado

## 🌐 API Endpoints

Base URL: `http://200.56.97.5:7281/`

### Autenticación
- `POST /api/Auth/login` - Iniciar sesión
- `GET /api/Auth/validate-token` - Validar token

### Viáticos
- `GET /api/Viatico/ListaViaticosPorEmpleado/:ejercicio/:empleado`
- `POST /api/Viatico` - Crear viático
- `PUT /api/Viatico` - Actualizar viático
- `GET /api/Viatico/FormatoComision/:oficina/:ejercicio/:noviat`

### Catálogos
- `GET /api/Empleados/GetEmpleadosByDeptoComi/:depto`
- `GET /api/Departamentos`
- `GET /api/Oficinas`
- `GET /api/Viaticos/Ciudades`
- `GET /api/Estados`
- `GET /api/Paises`

## 👥 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a la Comisión Estatal del Agua de Baja California.

## 📞 Soporte

Para soporte y preguntas, contactar al equipo de desarrollo.

---

**Versión:** 2.0.0 (Refactorizado con SOLID)  
**Última actualización:** Enero 2026