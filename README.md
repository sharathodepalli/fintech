# Financial Data Explorer

A modern web application for exploring and analyzing financial data of publicly traded companies. Built with React, TypeScript, and Tailwind CSS, this application provides an intuitive interface to view and analyze income statements.

## Features

- 📊 Real-time financial data from Financial Modeling Prep API
- 🔍 Search companies by stock symbol
- 🎯 Advanced filtering capabilities
- 📱 Responsive design for all devices
- 🌓 Dark/Light mode support
- 📈 Sort data by any column
- 💰 All financial values displayed in millions for better readability

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/financial-data-explorer.git
cd financial-data-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
VITE_BASE_URL=https://financialmodelingprep.com/api/v3
```

4. Get your API key:

   - Visit [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/)
   - Sign up for an account
   - Copy your API key
   - Replace `your_api_key_here` in the `.env` file with your actual API key

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Zustand (State Management)
- Lucide React (Icons)
- Financial Modeling Prep API

## Project Structure

```
financial-data-explorer/
├── src/
│   ├── components/      # React components
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Financial Modeling Prep](https://financialmodelingprep.com/) for providing the financial data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/financial-data-explorer](https://github.com/yourusername/financial-data-explorer)
