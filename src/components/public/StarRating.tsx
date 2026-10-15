function Star({ fill }: { fill: number }) {
  const id = `star-clip-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={24 * fill} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-stone-300"
      />
      <path
        d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z"
        fill="currentColor"
        className="text-amber-400"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${clamped} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} fill={Math.min(1, Math.max(0, clamped - i))} />
      ))}
    </div>
  );
}
