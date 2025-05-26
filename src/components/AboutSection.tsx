interface AboutSectionProps {
  darkMode: boolean;
}

export function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <div className="container-sm fade-in" style={{ animationDelay: '0.5s' }}>
      <div className={`mx-auto my-6 max-w-md p-4 rounded-xl border shadow-sm transition-all duration-300 ${
        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* About the Creator section removed as requested */}
      </div>
    </div>
  );
}
