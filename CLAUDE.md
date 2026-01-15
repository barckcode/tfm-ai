# Analítica de Turismo de Canarias - MVP TFM

## Descripción del Proyecto

Este es un **proyecto de Trabajo Fin de Máster (TFM)** para un programa de IA Generativa. El objetivo es construir una plataforma interactiva de análisis de turismo para las Islas Canarias que democratice el acceso a información turística para pequeñas empresas e instituciones locales.

## Visión Principal

Una aplicación React interactiva que incluye:
1. **Mapa 3D de las Islas Canarias** - Islas clicables que filtran datos
2. **Dashboard con KPIs** - Visualización de métricas de turismo
3. **Chat con IA (objetivo adicional)** - Q&A contextual impulsado por Claude restringido a información del dataset

## Stack Tecnológico

- **Frontend**: React 18+ con TypeScript
- **Visualización 3D**: React Three Fiber (Three.js)
- **Gráficas**: Recharts
- **Estilos**: Tailwind CSS
- **Chat con IA**: API de Anthropic Claude (si el tiempo lo permite)
- **Construcción**: Vite

## Detalles del Dataset

Archivo: `canarias_turismo_2015_2025.csv` (~4K filas)

### Esquema (20 columnas)

| Columna | Tipo | Descripción |
|--------|------|-------------|
| week_start_date | fecha | Inicio de la semana (YYYY-MM-DD) |
| year | int | Año (2015-2025) |
| month | int | Número de mes (1-12) |
| calendar_week | int | Semana del año (1-53) |
| island_code | string | Identificador de isla (01-07) |
| island_name | string | Nombre de la isla |
| total_tourists | int | Total de turistas esa semana |
| intl_passengers | int | Pasajeros internacionales |
| most_common_intl_country | string | Origen más común (ES, UK, DE, FR, IT, NL, SE, PT) |
| dom_passengers | int | Pasajeros domésticos |
| occupancy_rate | float | Ocupación hotelera (0.23-0.84) |
| avg_daily_rate_eur | float | Tarifa diaria promedio en EUR (30-112€) |
| nights | int | Total de noches de estancia |
| guests | int | Número de huéspedes |
| revenue | float | Ingresos hoteleros en EUR |
| avg_spend_per_trip | float | Gasto promedio por viaje (425-1205€) |
| stay_length | float | Estancia promedio en días (5.6-7.9) |
| total_expenditure | float | Gasto total turístico |
| events_count | int | Número de eventos esa semana |
| event_attendance | int | Asistencia a eventos |

### Islas (por volumen turístico)

| Código | Nombre | Total Turistas (2015-2025) |
|------|------|---------------------------|
| 01 | Tenerife | 10,740,750 |
| 02 | Gran Canaria | 10,322,008 |
| 03 | Lanzarote | 5,907,618 |
| 04 | Fuerteventura | 5,335,302 |
| 05 | La Palma | 1,867,756 |
| 06 | La Gomera | 964,021 |
| 07 | El Hierro | 642,514 |

### Rangos de Métricas Clave

- **Turistas por semana**: 332 - 34,537
- **Ocupación**: 23% - 84% (promedio 55%)
- **Tarifa Diaria**: 30€ - 112€ (promedio 60€)
- **Duración de Estancia**: 5.6 - 7.9 días (promedio 6.8)
- **Gasto por Viaje**: 425€ - 1,205€ (promedio 802€)

## Arquitectura

```
src/
├── components/
│   ├── Map3D/
│   │   ├── CanaryIslands.tsx      # Escena 3D principal
│   │   ├── Island.tsx             # Malla de isla individual
│   │   └── IslandGeometry.ts      # Definiciones de forma de isla
│   ├── Dashboard/
│   │   ├── KPICards.tsx           # Métricas resumidas
│   │   ├── TouristChart.tsx       # Series temporales
│   │   ├── OccupancyChart.tsx     # Tendencias de ocupación
│   │   ├── OriginChart.tsx        # Desglose por país
│   │   └── SeasonalityChart.tsx   # Patrones mensuales
│   ├── Chat/                      # (Objetivo adicional)
│   │   ├── ChatPanel.tsx
│   │   └── ChatMessage.tsx
│   └── Layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── hooks/
│   ├── useTourismData.ts          # Carga y filtrado de datos
│   └── useIslandSelection.ts      # Gestión del estado de isla
├── data/
│   └── tourism.json               # Datos CSV transformados
├── types/
│   └── tourism.ts                 # Interfaces de TypeScript
├── utils/
│   ├── dataTransforms.ts          # Funciones de agregación
│   └── formatters.ts              # Formateo de números/fechas
├── App.tsx
└── main.tsx
```

## Flujo de Usuario

1. **Vista de Inicio**: El mapa 3D muestra todas las Islas Canarias con totales agregados
2. **Selección de Isla**: El usuario hace clic en una isla → el mapa hace zoom/resalta → el dashboard filtra a esa isla
3. **Navegación de Vuelta**: El botón "Todas las Islas" regresa a la vista agregada
4. **Filtrado Temporal**: Selectores de año/mes para reducir el rango temporal
5. **Chat (adicional)**: Hacer preguntas sobre los datos en lenguaje natural

## Fases de Implementación

### Fase 1: Configuración del Proyecto y Datos
- [ ] Inicializar Vite + React + TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Transformar CSV a estructura JSON optimizada
- [ ] Crear interfaces de TypeScript
- [ ] Implementar hook de carga de datos

### Fase 2: Mapa 3D
- [ ] Configurar escena de React Three Fiber
- [ ] Crear geometrías de islas simplificadas (pueden ser polígonos extruidos)
- [ ] Implementar detección de clic por isla
- [ ] Agregar efectos de hover y resaltado de selección
- [ ] Controles de cámara (órbita, zoom a isla)

### Fase 3: Dashboard
- [ ] Tarjetas KPI (total turistas, ocupación promedio, ingresos, etc.)
- [ ] Gráfica de series temporales (turistas a lo largo del tiempo)
- [ ] Gráfica de barras (turistas por país de origen)
- [ ] Mapa de calor estacional o gráfica de líneas
- [ ] Todas las gráficas responden a la selección de isla

### Fase 4: Pulido
- [ ] Transiciones suaves entre vistas
- [ ] Estados de carga
- [ ] Diseño responsivo
- [ ] Manejo de errores

### Fase 5: Chat con IA (Objetivo Adicional)
- [ ] Componente de UI de chat
- [ ] Integración con API de Claude
- [ ] Prompt del sistema que restringe respuestas al contexto del dataset
- [ ] Mostrar respuestas respaldadas por datos

## Guías de Diseño

- **Paleta de Colores**: Azules océano, amarillos arena, grises volcánicos
- **Tipografía**: Sans-serif limpia y moderna
- **Islas**: Cada isla debe tener un color distintivo pero armonioso
- **Interacciones**: Retroalimentación suave en hover/clic, transiciones ~300ms
- **Móvil**: Responsivo pero orientado a escritorio primero (la presentación del TFM será en escritorio)

## Comandos Clave

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de construcción de producción
npm run preview
```

## Notas Importantes

1. **Los datos son reales**: Provenientes de estadísticas oficiales del gobierno de las Islas Canarias
2. **Restricción de tiempo**: ~2 semanas para completar
3. **Contexto académico**: Esto es para una presentación de TFM, necesita ser visualmente impresionante
4. **Prioridad del Mapa 3D**: El mapa interactivo es la característica principal
5. **No se necesita backend**: Todos los datos pueden empaquetarse con el frontend

## Posiciones Aproximadas de las Islas (para mapa 3D)

Posiciones relativas (coordenadas normalizadas, Tenerife como referencia central):

| Isla | X | Y | Tamaño Relativo |
|--------|---|---|---------------|
| El Hierro | -2.0 | -0.5 | 0.3 |
| La Palma | -1.5 | 0.8 | 0.4 |
| La Gomera | -1.0 | 0.0 | 0.3 |
| Tenerife | 0.0 | 0.0 | 1.0 |
| Gran Canaria | 1.2 | -0.3 | 0.9 |
| Fuerteventura | 2.2 | -0.2 | 0.7 |
| Lanzarote | 2.5 | 0.6 | 0.5 |

## Criterios de Éxito

1. El usuario puede ver el mapa 3D de las 7 Islas Canarias
2. Hacer clic en una isla filtra todos los datos del dashboard a esa isla
3. El dashboard muestra al menos 4 visualizaciones diferentes
4. El filtrado basado en tiempo funciona (año/mes)
5. El diseño visual está pulido y profesional
6. (Adicional) El chat con IA responde preguntas sobre los datos
