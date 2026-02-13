A futuristic, responsive portfolio website for Hassan Sarfraz built with Next.js 16.1+, Tailwind CSS, Framer Motion, and MySQL.

## Features

- 🎨 **Dynamic Gradient Theme** - Toggle between charcoal and lime themes
- ✨ **Glassmorphism UI** - Modern glass card effects
- 🚀 **Framer Motion Animations** - Smooth scroll and hover animations
- 📱 **Fully Responsive** - Mobile-first design
- 🗄️ **MySQL Database** - Dynamic content from database
- 🔧 **Drizzle ORM** - Type-safe database queries

## Tech Stack

- **Framework**: Next.js 16.1+ with App Router & Turbopack
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MySQL 8.0+
- **ORM**: Drizzle ORM
- **Fonts**: Chakra Petch, Mulish (via next/font)

## Getting Started

### Prerequisites

- Node.js 24+
- MySQL 8.0+
- npm

### Database Setup

1. Create the database and tables:

```bash
mysql -u root -p < database/hassanport_db_schema.sql
```

2. Seed the database with sample data:

```bash
mysql -u root -p < database/seed_data.sql
```

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL=mysql://root:password@localhost:3306/hassanport_db
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hassanport_db
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── database/
│   ├── hassanport_db_schema.sql   # Database schema
│   └── seed_data.sql              # Sample data
├── src/
│   ├── app/
│   │   ├── api/contact/           # Contact form API
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── layout/                # Header, Footer
│   │   ├── sections/              # Page sections
│   │   └── ui/                    # Reusable UI components
│   ├── db/
│   │   ├── index.ts               # Database connection
│   │   └── schema.ts              # Drizzle schema
│   └── lib/
│       └── actions.ts             # Server actions
└── tailwind.config.ts             # Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Color Palette

- **Charcoal**: `#181818`
- **Lime**: `#B0FC51`

## License

MIT License
