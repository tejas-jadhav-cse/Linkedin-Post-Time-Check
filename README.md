# LinkedIn Timestamp Extractor

A modern, minimal web application that extracts exact timestamps from LinkedIn posts and comments. Built with React, TypeScript, and Tailwind CSS.

![LinkedIn Timestamp Extractor](https://img.shields.io/badge/React-TypeScript-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## ✨ Features

- **🎯 Accurate Extraction**: Extract precise timestamps from LinkedIn post and comment URLs
- **🌓 Dark Mode**: Toggle between light and dark themes
- **📋 Copy to Clipboard**: Easily copy timestamps in various formats
- **📚 History**: Keep track of recently extracted URLs (stored locally)
- **📱 Responsive**: Works perfectly on both desktop and mobile devices
- **⚡ Fast**: Built with Vite for lightning-fast development and builds
- **🎨 Modern UI**: Clean, centered design with minimal elements and subtle animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd linkedin-timestamp-extractor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔧 Usage

1. **Copy a LinkedIn post URL**: Go to any LinkedIn post, click the three dots menu, and select "Copy link to post"
2. **Paste the URL**: Enter the LinkedIn URL in the input field
3. **Extract**: Click the "Extract Timestamp" button
4. **View Results**: See the timestamp in multiple formats:
   - Unix timestamp
   - ISO format
   - Local time
   - Relative time

### Supported URL Formats

- LinkedIn posts: `https://www.linkedin.com/posts/...`
- LinkedIn comments: URLs with comment parameters

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React hooks with localStorage

## 🎨 Design Features

- **Centered Minimal Design**: All content is centered for a clean, focused experience
- **Subtle Gradient Backgrounds**: Soft gradient backgrounds that adapt to theme
- **Glass Morphism Effects**: Semi-transparent backgrounds with backdrop blur
- **Smooth Animations**: Fade-in, hover, and subtle transform effects
- **Reduced Visual Noise**: Simplified UI with focus on essential elements
- **Consistent Spacing**: Uniform padding and margins throughout
- **High Contrast Text**: Improved readability across light and dark modes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔍 How It Works

The extraction algorithm is based on the original work by [Ollie Boyd](https://github.com/Ollie-Boyd/Linkedin-post-timestamp-extractor):

1. Extract the 19-digit post ID from the LinkedIn URL
2. Convert the ID to binary representation
3. Take the first 41 bits of the binary string
4. Convert back to decimal to get Unix timestamp in milliseconds
5. Format the timestamp into human-readable dates

For comments, it extracts the comment ID using a specific regex pattern for LinkedIn's comment URL structure.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original algorithm by [Ollie Boyd](https://github.com/Ollie-Boyd/Linkedin-post-timestamp-extractor)
- Inspired by Ryan Benson's work on TikTok timestamps
- Built with modern web technologies for enhanced user experience

---

Made with ❤️ using React, TypeScript, and Tailwind CSS
