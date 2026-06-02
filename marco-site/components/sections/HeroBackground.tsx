export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Фоновое изображение */}
      <img
        src="/images/hero-bg.jpg"
        alt="Фон секции"
        className="w-full h-full object-cover brightness-[0.75] contrast-[1.05] pointer-events-none"
        loading="eager"
        fetchPriority="high"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      
      {/* Градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-marco-bg/10 via-marco-bg/50 to-marco-bg" />
      
      {/* Декоративные блюры */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-marco-accent/5 rounded-full blur-[140px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-marco-accent/5 rounded-full blur-[120px] opacity-60" />
    </div>
  );
}