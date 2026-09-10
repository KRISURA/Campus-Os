import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Trophy, BookOpen, Compass, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackIcon?: React.ReactNode;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Technical: 'from-blue-600 via-indigo-600 to-cyan-700',
  Cultural: 'from-purple-600 via-pink-600 to-rose-700',
  Sports: 'from-amber-600 via-orange-600 to-red-700',
  'Social Work': 'from-emerald-600 via-teal-600 to-cyan-700',
  Literary: 'from-violet-600 via-purple-600 to-indigo-700',
  Innovation: 'from-rose-600 via-pink-600 to-purple-700',
  Facility: 'from-slate-700 via-slate-800 to-slate-900',
  Event: 'from-blue-700 via-indigo-700 to-purple-800',
  default: 'from-slate-800 via-indigo-950 to-slate-900'
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Technical: <Sparkles className="w-5 h-5 text-cyan-300 opacity-90" />,
  Cultural: <Compass className="w-5 h-5 text-pink-300 opacity-90" />,
  Sports: <Trophy className="w-5 h-5 text-amber-300 opacity-90" />,
  'Social Work': <Users className="w-5 h-5 text-emerald-300 opacity-90" />,
  Literary: <BookOpen className="w-5 h-5 text-indigo-300 opacity-90" />,
  Innovation: <Sparkles className="w-5 h-5 text-rose-300 opacity-90" />,
  Facility: <ImageIcon className="w-5 h-5 text-slate-300 opacity-90" />,
  Event: <Calendar className="w-5 h-5 text-blue-300 opacity-90" />,
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackCategory = 'default',
  fallbackIcon,
  ...props
}) => {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    const gradient = CATEGORY_GRADIENTS[fallbackCategory] || CATEGORY_GRADIENTS.default;
    const icon = fallbackIcon || CATEGORY_ICONS[fallbackCategory] || <ImageIcon className="w-5 h-5 text-slate-300 opacity-80" />;

    return (
      <div 
        className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-center p-2 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          {icon}
          {alt && (
            <span className="mt-1 text-[10px] font-bold text-white/90 line-clamp-1 px-1 drop-shadow">
              {alt}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};
