import type { Metadata } from 'next'
import { Inter, Playfair_Display, Source_Code_Pro } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Dr. Durga Madhab Prusty | Professor of Odia Literature',
  description: 'Distinguished Professor of Odia Literature - Scholar, Researcher, and Cultural Ambassador. Explore decades of academic excellence, research publications, and contributions to Odia literary heritage.',
  keywords: ['Odia Literature', 'Professor', 'Research', 'Academic', 'Durga Madhab Prusty', 'Scholar'],
  authors: [{ name: 'Dr. Durga Madhab Prusty' }],
  openGraph: {
    title: 'Dr. Durga Madhab Prusty | Professor of Odia Literature',
    description: 'Distinguished Professor of Odia Literature - Scholar, Researcher, and Cultural Ambassador.',
    type: 'profile',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Durga Madhab Prusty | Professor of Odia Literature',
    description: 'Distinguished Professor of Odia Literature - Scholar, Researcher, and Cultural Ambassador.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${sourceCodePro.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  )
}
