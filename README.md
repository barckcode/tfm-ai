# Analítica de Turismo de Canarias - MVP TFM

> Plataforma interactiva de análisis de turismo para las Islas Canarias
>
> **Proyecto TFM** - Máster en IA Generativa 2025

## 🚀 Inicio Rápido

```bash
# Instalar dependencias (¡ya está hecho!)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

¡Abre http://localhost:3000 para ver la aplicación!

## ✨ Características

- 🗺️ **Mapa Interactivo 3D** - Islas Canarias clicables con React Three Fiber
- 📊 **Dashboard en Tiempo Real** - Métricas de turismo y KPIs
- 📈 **Visualización de Datos** - Series temporales, estacionalidad, países de origen
- 🎨 **UI Moderna** - Tailwind CSS con tema océano/volcánico
- 📱 **Diseño Responsivo** - Funciona en escritorio y móvil
- 📦 **Datos de 10+ Años** - Estadísticas reales de turismo (2015-2025)

## 📚 Documentación

- **[README.md](./README.md)** - ¡Empieza aquí! Ejecuta la app y prueba las características
- **[CLAUDE.md](./CLAUDE.md)** - Especificaciones completas del proyecto y arquitectura

## 🏗️ Stack Tecnológico

- **React 18** + TypeScript
- **Vite** - Herramienta de construcción
- **React Three Fiber** - Gráficos 3D
- **Recharts** - Visualización de datos
- **Tailwind CSS** - Estilos

## 🏝️ Las 7 Islas Canarias

1. **Tenerife** (10.7M turistas) - Azul
2. **Gran Canaria** (10.3M turistas) - Azul Claro
3. **Lanzarote** (5.9M turistas) - Amarillo
4. **Fuerteventura** (5.3M turistas) - Arena
5. **La Palma** (1.9M turistas) - Gris-Azul
6. **La Gomera** (1.0M turistas) - Gris Oscuro
7. **El Hierro** (0.6M turistas) - Gris Más Oscuro

## 🎯 Flujo de Usuario

1. **Vista Principal** - Ver las 7 islas con datos agregados
2. **Clic en Isla** - Filtrar datos para isla específica
3. **Explorar Métricas** - Ver KPIs y gráficas
4. **Comparar Islas** - Cambiar entre islas
5. **Volver a Vista General** - Clic en "Ver Todas las Islas"

## 📊 Información de los Datos

- **20 métricas** por punto de datos
- **~4,000 registros** (datos semanales)
- **Principales países de origen**: España, Reino Unido, Alemania, Francia
- **Temporada alta**: Julio-Agosto
- **Estancia media**: 6.8 días
- **Gasto medio**: €802/viaje

## 🎓 Presentación TFM

Perfecto para demostrar:
- ✅ Visualización interactiva de datos
- ✅ Gráficos web 2D
- ✅ Análisis de datos del mundo real
- ✅ Desarrollo web moderno
- ✅ Diseño de experiencia de usuario

## 📦 Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── Map3D/       # Visualización 3D
│   ├── Dashboard/   # Gráficas y KPIs
│   └── Layout/      # Header y Sidebar
├── hooks/           # Hooks personalizados de React
├── data/            # Datos JSON de turismo
├── types/           # Definiciones de TypeScript
└── utils/           # Funciones auxiliares
```

## 🐛 Solución de Problemas

### ¿La aplicación no inicia?
```bash
rm -rf node_modules
npm install
npm run dev
```

### ¿Los datos no se cargan?
- Verifica que existe `src/data/tourism_data.json`
- Revisa la consola del navegador para errores

## 📝 Licencia

Licencia MIT - Ver [LICENSE](./LICENSE)

## 👨‍💻 Autor

**Proyecto TFM** - Máster en IA Generativa 2025

---

🌟 **¡Dale una estrella a este repo si te resulta útil!**

📧 ¿Preguntas? ¡Abre un issue!
