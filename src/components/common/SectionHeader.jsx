export default function SectionHeader({ title, subtitle, icon: Icon, accent = '#FF6B00' }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      {Icon && (
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${accent}20`, border: `1px solid ${accent}40` }}>
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
      )}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[#64748b] text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
