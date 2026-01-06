# Canarias Tourism Analytics - TFM MVP

## Project Overview

This is a **Master's Thesis (TFM) project** for a Generative AI program. The goal is to build an interactive tourism analytics platform for the Canary Islands that democratizes access to tourism insights for small businesses and local institutions.

## Core Vision

An interactive React application featuring:
1. **3D Map of Canary Islands** - Clickable islands that filter data
2. **Dashboard with KPIs** - Tourism metrics visualization
3. **AI Chat (stretch goal)** - Claude-powered contextual Q&A restricted to dataset insights

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **3D Visualization**: React Three Fiber (Three.js)
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **AI Chat**: Anthropic Claude API (if time permits)
- **Build**: Vite

## Dataset Details

File: `canarias_turismo_2015_2025.csv` (~4K rows)

### Schema (20 columns)

| Column | Type | Description |
|--------|------|-------------|
| week_start_date | date | Start of the week (YYYY-MM-DD) |
| year | int | Year (2015-2025) |
| month | int | Month number (1-12) |
| calendar_week | int | Week of year (1-53) |
| island_code | string | Island identifier (01-07) |
| island_name | string | Island name |
| total_tourists | int | Total tourists that week |
| intl_passengers | int | International passengers |
| most_common_intl_country | string | Most common origin (ES, UK, DE, FR, IT, NL, SE, PT) |
| dom_passengers | int | Domestic passengers |
| occupancy_rate | float | Hotel occupancy (0.23-0.84) |
| avg_daily_rate_eur | float | Average daily rate in EUR (30-112€) |
| nights | int | Total nights stayed |
| guests | int | Number of guests |
| revenue | float | Hotel revenue in EUR |
| avg_spend_per_trip | float | Average spend per trip (425-1205€) |
| stay_length | float | Average stay in days (5.6-7.9) |
| total_expenditure | float | Total tourist expenditure |
| events_count | int | Number of events that week |
| event_attendance | int | Event attendance |

### Islands (by tourist volume)

| Code | Name | Total Tourists (2015-2025) |
|------|------|---------------------------|
| 01 | Tenerife | 10,740,750 |
| 02 | Gran Canaria | 10,322,008 |
| 03 | Lanzarote | 5,907,618 |
| 04 | Fuerteventura | 5,335,302 |
| 05 | La Palma | 1,867,756 |
| 06 | La Gomera | 964,021 |
| 07 | El Hierro | 642,514 |

### Key Metrics Ranges

- **Tourists per week**: 332 - 34,537
- **Occupancy**: 23% - 84% (avg 55%)
- **Daily Rate**: 30€ - 112€ (avg 60€)
- **Stay Length**: 5.6 - 7.9 days (avg 6.8)
- **Spend per Trip**: 425€ - 1,205€ (avg 802€)

## Architecture

```
src/
├── components/
│   ├── Map3D/
│   │   ├── CanaryIslands.tsx      # Main 3D scene
│   │   ├── Island.tsx             # Individual island mesh
│   │   └── IslandGeometry.ts      # Island shape definitions
│   ├── Dashboard/
│   │   ├── KPICards.tsx           # Summary metrics
│   │   ├── TouristChart.tsx       # Time series
│   │   ├── OccupancyChart.tsx     # Occupancy trends
│   │   ├── OriginChart.tsx        # Country breakdown
│   │   └── SeasonalityChart.tsx   # Monthly patterns
│   ├── Chat/                      # (Stretch goal)
│   │   ├── ChatPanel.tsx
│   │   └── ChatMessage.tsx
│   └── Layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── hooks/
│   ├── useTourismData.ts          # Data loading & filtering
│   └── useIslandSelection.ts      # Island state management
├── data/
│   └── tourism.json               # Transformed CSV data
├── types/
│   └── tourism.ts                 # TypeScript interfaces
├── utils/
│   ├── dataTransforms.ts          # Aggregation functions
│   └── formatters.ts              # Number/date formatting
├── App.tsx
└── main.tsx
```

## User Flow

1. **Landing View**: 3D map shows all Canary Islands with aggregated totals
2. **Island Selection**: User clicks an island → map zooms/highlights → dashboard filters to that island
3. **Back Navigation**: "All Islands" button returns to aggregated view
4. **Time Filtering**: Year/month selectors to narrow temporal range
5. **Chat (stretch)**: Ask questions about the data in natural language

## Implementation Phases

### Phase 1: Project Setup & Data
- [ ] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind CSS
- [ ] Transform CSV to optimized JSON structure
- [ ] Create TypeScript interfaces
- [ ] Implement data loading hook

### Phase 2: 3D Map
- [ ] Set up React Three Fiber scene
- [ ] Create simplified island geometries (can be extruded polygons)
- [ ] Implement click detection per island
- [ ] Add hover effects and selection highlighting
- [ ] Camera controls (orbit, zoom to island)

### Phase 3: Dashboard
- [ ] KPI cards (total tourists, avg occupancy, revenue, etc.)
- [ ] Time series chart (tourists over time)
- [ ] Bar chart (tourists by origin country)
- [ ] Seasonal heatmap or line chart
- [ ] All charts respond to island selection

### Phase 4: Polish
- [ ] Smooth transitions between views
- [ ] Loading states
- [ ] Responsive design
- [ ] Error handling

### Phase 5: AI Chat (Stretch Goal)
- [ ] Chat UI component
- [ ] Integration with Claude API
- [ ] System prompt restricting responses to dataset context
- [ ] Display data-backed answers

## Design Guidelines

- **Color Palette**: Ocean blues, sandy yellows, volcanic grays
- **Typography**: Clean, modern sans-serif
- **Islands**: Each island should have a distinct but harmonious color
- **Interactions**: Smooth hover/click feedback, transitions ~300ms
- **Mobile**: Responsive but desktop-first (TFM presentation will be on desktop)

## Key Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Notes

1. **Data is real**: Sourced from official Canary Islands government statistics
2. **Time constraint**: ~2 weeks to complete
3. **Academic context**: This is for a TFM presentation, needs to be visually impressive
4. **3D Map priority**: The interactive map is the hero feature
5. **No backend needed**: All data can be bundled with the frontend

## Island Approximate Positions (for 3D map)

Relative positions (normalized coordinates, Tenerife as center reference):

| Island | X | Y | Relative Size |
|--------|---|---|---------------|
| El Hierro | -2.0 | -0.5 | 0.3 |
| La Palma | -1.5 | 0.8 | 0.4 |
| La Gomera | -1.0 | 0.0 | 0.3 |
| Tenerife | 0.0 | 0.0 | 1.0 |
| Gran Canaria | 1.2 | -0.3 | 0.9 |
| Fuerteventura | 2.2 | -0.2 | 0.7 |
| Lanzarote | 2.5 | 0.6 | 0.5 |

## Success Criteria

1. User can see 3D map of all 7 Canary Islands
2. Clicking an island filters all dashboard data to that island
3. Dashboard shows at least 4 different visualizations
4. Time-based filtering works (year/month)
5. Visual design is polished and professional
6. (Stretch) AI chat answers questions about the data
