# Canarias Tourism Analytics - TFM MVP

> Interactive tourism analytics platform for the Canary Islands
>
> **TFM Project** - Master's in Generative AI 2025

## 🚀 Quick Start

```bash
# Install dependencies (already done!)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 to see the app!

## ✨ Features

- 🗺️ **Interactive 3D Map** - Clickable Canary Islands with React Three Fiber
- 📊 **Real-time Dashboard** - Tourism metrics and KPIs
- 📈 **Data Visualization** - Time series, seasonality, origin countries
- 🎨 **Modern UI** - Tailwind CSS with ocean/volcanic theme
- 📱 **Responsive Design** - Works on desktop and mobile
- 📦 **10+ Years Data** - Real tourism statistics (2015-2025)

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Start here! Run the app and test features
- **[README_SETUP.md](./README_SETUP.md)** - Complete setup guide and project structure
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to Vercel, Netlify, or GitHub Pages
- **[CLAUDE.md](./CLAUDE.md)** - Full project specifications and architecture

## 🏗️ Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **React Three Fiber** - 3D graphics
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling

## 🏝️ The 7 Canary Islands

1. **Tenerife** (10.7M tourists) - Blue
2. **Gran Canaria** (10.3M tourists) - Light Blue
3. **Lanzarote** (5.9M tourists) - Yellow
4. **Fuerteventura** (5.3M tourists) - Sand
5. **La Palma** (1.9M tourists) - Gray-Blue
6. **La Gomera** (1.0M tourists) - Dark Gray
7. **El Hierro** (0.6M tourists) - Darkest Gray

## 🎯 User Flow

1. **Landing View** - See all 7 islands with aggregated data
2. **Click Island** - Filter data for specific island
3. **Explore Metrics** - View KPIs and charts
4. **Compare Islands** - Switch between islands
5. **Return to Overview** - Click "View All Islands"

## 📊 Data Insights

- **20 metrics** per data point
- **~4,000 records** (weekly data)
- **Top origin countries**: Spain, UK, Germany, France
- **Peak season**: July-August
- **Average stay**: 6.8 days
- **Average spend**: €802/trip

## 🎓 TFM Presentation

Perfect for demonstrating:
- ✅ Interactive data visualization
- ✅ 3D web graphics
- ✅ Real-world data analysis
- ✅ Modern web development
- ✅ User experience design

## 📦 Project Structure

```
src/
├── components/       # React components
│   ├── Map3D/       # 3D visualization
│   ├── Dashboard/   # Charts and KPIs
│   └── Layout/      # Header and Sidebar
├── hooks/           # Custom React hooks
├── data/            # Tourism JSON data
├── types/           # TypeScript definitions
└── utils/           # Helper functions
```

## 🚢 Deployment

Deploy in minutes to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions.

## 🐛 Troubleshooting

### App won't start?
```bash
rm -rf node_modules
npm install
npm run dev
```

### 3D map not rendering?
- Check browser supports WebGL
- Try Chrome or Firefox
- Update graphics drivers

### Data not loading?
- Verify `src/data/tourism_data.json` exists
- Check browser console for errors

## 📝 License

MIT License - See [LICENSE](./LICENSE)

## 👨‍💻 Author

**TFM Project** - Master's in Generative AI 2025

---

🌟 **Star this repo if you find it useful!**

📧 Questions? Open an issue!
