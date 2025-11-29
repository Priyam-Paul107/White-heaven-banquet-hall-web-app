import { Crown } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Logo Badge */}
      <div className="relative p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-xl">
        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm"></div>
        <Crown className="w-10 h-10 text-white relative drop-shadow-md" strokeWidth={1.3} />
      </div>

      {/* Stylish Text */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold tracking-wide text-gray-900 drop-shadow-sm">
          White <span className="text-yellow-600">Heaven</span>
        </h1>
        <p className="text-gray-500 text-lg tracking-wider uppercase font-medium">
          Banquet Hall
        </p>
      </div>
    </div>
  );
}
