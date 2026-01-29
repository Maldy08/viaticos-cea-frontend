# Refactorización del Proyecto - Aplicación de Principios SOLID

## Resumen

Este documento describe la refactorización sistemática del proyecto de viáticos para aplicar los principios SOLID y mejorar la arquitectura del código.

## Fases Completadas

### ✅ FASE 1: Tipos e Interfaces (ISP - Interface Segregation Principle)

**Objetivo:** Segregar interfaces grandes en interfaces más específicas y organizadas por dominio.

**Cambios realizados:**
- Creada estructura `src/types/` organizada por dominio
- Tipos segregados en:
  - `common/` - Tipos base compartidos
  - `auth/` - Autenticación y usuarios
  - `empleados/` - Empleados
  - `viaticos/` - Viáticos, partidas y reportes
  - `catalogos/` - Departamentos, oficinas, ciudades, estados, países
  - `ui/` - Estado de UI
  - `store/` - Tipos del store Redux
  - `legacy/` - Compatibilidad con código antiguo

**Beneficios:**
- Eliminación de tipos `any` en código crítico
- Mejor autocompletado en IDE
- Tipos reutilizables y bien documentados
- Compatibilidad mantenida con código legacy

**Archivos afectados:**
- Nuevo: `src/types/**/*`
- Actualizado: `src/interfaces/interfaces.ts` (ahora solo re-exporta)
- Actualizados: Todos los slices de Redux
- Actualizados: Todos los hooks

---

### ✅ FASE 2: Capa de Servicios (DIP - Dependency Inversion Principle)

**Objetivo:** Crear una capa de abstracción entre la lógica de negocio y el acceso a datos.

**Cambios realizados:**

#### 2.1 Interfaces de Repositorios
Creadas interfaces que definen contratos para acceso a datos:
- `IAuthRepository`
- `IEmpleadosRepository`
- `IViaticosRepository`
- `IPartidasRepository`
- `IDepartamentosRepository`
- `IOficinasRepository`
- `ICiudadesRepository`
- `IEstadosRepository`
- `IPaisesRepository`

#### 2.2 Cliente HTTP Base
- `HttpClient` - Manejo centralizado de peticiones HTTP
- Manejo de errores unificado
- Métodos tipados (get, post, put, delete)

#### 2.3 Implementaciones Concretas
Repositorios que implementan las interfaces:
- `AuthRepository`
- `EmpleadosRepository`
- `ViaticosRepository`
- `PartidasRepository`
- Repositorios de catálogos

#### 2.4 Hooks Actualizados
Todos los hooks ahora dependen de repositorios (abstracciones) en lugar de llamar directamente a la API.

**Beneficios:**
- Inversión de dependencias aplicada
- Código más testeable (fácil crear mocks)
- Separación clara de responsabilidades
- Cambios en API no afectan hooks
- Manejo de errores centralizado

**Archivos afectados:**
- Nuevo: `src/services/api/**/*`
- Nuevo: `src/services/repositories/**/*`
- Actualizados: `src/hooks/**/*`

---

### ✅ FASE 3: Lógica de Negocio (SRP + OCP)

**Objetivo:** Extraer lógica de negocio a servicios de dominio reutilizables.

**Cambios realizados:**

#### 3.1 Servicio de Cálculo de Viáticos (`ViaticoCalculator`)
- Centraliza toda la lógica de cálculo de importes
- Aplica tarifas según nivel de empleado y ubicación
- Determina partida presupuestal automáticamente
- Extensible para nuevas reglas de negocio
```typescript
const resultado = viaticoCalculator.calcular({
  dias: 3,
  nivelEmpleado: 15,
  fueraDelEstado: true,
  fueraDelPais: false
});
// resultado.importe = 1200
// resultado.partida = 37501
```

#### 3.2 Validador de Ubicaciones (`UbicacionValidator`)
- Determina si un destino está fuera del estado/país
- Reglas de negocio centralizadas
- Validaciones de origen vs destino

#### 3.3 Utilidades de Fecha (`DateUtils`)
- Funciones reutilizables para manejo de fechas
- Reemplaza helpers dispersos (`getMes`, `getDays`)
- Validaciones de rangos y ejercicios

#### 3.4 Tipos de Negocio
- `calculo.types.ts` - Tipos para cálculos de viáticos
- Enums para niveles y ubicaciones
- Configuración de tarifas

**Beneficios:**
- **SRP:** Cada servicio tiene una única responsabilidad
- **OCP:** Extensible sin modificar código existente
- Lógica de negocio centralizada y documentada
- Fácil de testear en aislamiento
- Reutilizable en diferentes componentes

**Archivos afectados:**
- Nuevo: `src/types/viaticos/calculo.types.ts`
- Nuevo: `src/services/domain/ViaticoCalculator.ts`
- Nuevo: `src/services/domain/UbicacionValidator.ts`
- Nuevo: `src/services/domain/DateUtils.ts`
- Actualizado: `src/viaticos/pages/CapturarViaticos.tsx`
- Deprecado: `src/helpers/importePorDias.ts`

---

## Estructura del Proyecto Actual
```
src/
├── api/                    # Configuración de Axios
├── types/                  # Tipos TypeScript segregados ✨ NUEVO
│   ├── common/
│   ├── auth/
│   ├── empleados/
│   ├── viaticos/
│   ├── catalogos/
│   ├── ui/
│   ├── store/
│   └── legacy/
├── services/               # Servicios y repositorios ✨ NUEVO
│   ├── api/               # Cliente HTTP
│   ├── repositories/      # Acceso a datos (Patrón Repository)
│   │   ├── interfaces/   # Contratos
│   │   └── *.ts          # Implementaciones
│   └── domain/           # Lógica de negocio
│       ├── ViaticoCalculator.ts
│       ├── UbicacionValidator.ts
│       └── DateUtils.ts
├── store/                 # Redux slices (actualizados con tipos)
├── hooks/                 # Custom hooks (usan repositorios)
├── viaticos/             # Componentes y páginas
├── helpers/              # Utilidades (algunos deprecados)
└── interfaces/           # Legacy (solo re-exporta)
```

---

## Principios SOLID Aplicados

### ✅ Single Responsibility Principle (SRP)
- Cada servicio tiene una única responsabilidad
- Separación clara: UI → Hooks → Repositorios → API
- Slices de Redux enfocados en un dominio específico

### ✅ Open/Closed Principle (OCP)
- `ViaticoCalculator` extensible para nuevas tarifas
- Nuevos repositorios pueden agregarse sin modificar existentes
- Estrategia de cálculo puede cambiarse sin tocar componentes

### ✅ Liskov Substitution Principle (LSP)
- Interfaces bien definidas y consistentes
- Implementaciones intercambiables

### ✅ Interface Segregation Principle (ISP)
- Tipos segregados por dominio
- Interfaces específicas vs monolíticas
- No se fuerza a implementar métodos innecesarios

### ✅ Dependency Inversion Principle (DIP)
- Hooks dependen de interfaces, no de implementaciones
- Repositorios pueden ser mockeados para testing
- Componentes desacoplados de la API

---

## Métricas de Mejora

### Antes
- **Archivo `interfaces.ts`:** 200+ líneas, todas las interfaces mezcladas
- **Hooks:** Dependencia directa de `viaticosApi`
- **Lógica de negocio:** Dispersa en componentes y helpers
- **Tipos `any`:** Presentes en varios lugares
- **Testabilidad:** Difícil de testear (dependencias concretas)

### Después
- **Tipos:** Organizados en 30+ archivos específicos
- **Hooks:** Dependen de abstracciones (repositorios)
- **Lógica de negocio:** Centralizada en servicios de dominio
- **Tipos `any`:** Eliminados en código crítico
- **Testabilidad:** Alta (dependencias inyectables/mockeables)

---

## Próximos Pasos

### FASE 4: Refactorización de Componentes
- Descomponer `CapturarViaticos.tsx` (500+ líneas)
- Crear componentes pequeños y reutilizables
- Extraer hooks personalizados

### FASE 5: Optimizaciones
- Selectores memoizados
- React.memo en componentes pesados
- Considerar RTK Query

### FASE 6: Testing
- Tests unitarios para servicios de dominio
- Tests de integración para repositorios
- Tests de componentes

---

## Comandos Útiles
```bash
# Compilar el proyecto
npm run build

# Verificar tipos
npm run type-check  # (si existe)

# Ejecutar en desarrollo
npm run dev
```

---

## Notas

- Toda la funcionalidad existente se mantiene intacta
- Compatibilidad con código legacy garantizada
- Cambios incrementales y compilables en cada fase
- Sin breaking changes para el usuario final