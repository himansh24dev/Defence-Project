export default function LoadingSpinner({ text = 'Fetching intelligence...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#1e2d4a]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF6B00] animate-spin" />
      </div>
      <p className="text-[#475569] text-sm">{text}</p>
    </div>
  )
}
