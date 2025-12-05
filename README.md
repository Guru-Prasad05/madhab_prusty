# Dr. Durga Madhab Prusty - Professor Profile Website

A stunning, world-class profile website for Dr. Durga Madhab Prusty, Distinguished Professor of Odia Literature.

## Features

- **Modern Design**: Elegant, professional design with cultural Odia elements
- **Responsive**: Fully responsive across all devices
- **Animated**: Smooth animations using Framer Motion
- **Accessible**: WCAG 2.1 AA compliant
- **Fast**: Optimized for performance with Next.js 14

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Playfair Display, Inter, Source Code Pro

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd professor-profile
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

## Customization

### Profile Information

Edit the data objects in `app/page.tsx`:
- `stats`: Update statistics (publications, experience, awards, students)
- `timeline`: Academic journey milestones
- `publications`: Research papers and books
- `testimonials`: Student and colleague testimonials

### Styling

- Colors: Edit `tailwind.config.ts` to change the color palette
- Fonts: Modify font imports in `app/layout.tsx`
- Animations: Customize animation variants in `app/page.tsx`

### Adding Profile Photo

Replace the placeholder in the Hero section with an actual image:
```jsx
<Image 
  src="/your-photo.jpg" 
  alt="Dr. Durga Madhab Prusty"
  fill
  className="object-cover"
/>
```

## Project Structure

```
professor-profile/
├── app/
│   ├── globals.css      # Global styles and Tailwind
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies
```

## License

This project is created for Dr. Durga Madhab Prusty's personal use.

---

Built with ❤️ for Odia Literature
