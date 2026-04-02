interface EnsoLogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function EnsoLogo({
  size = 48,
  animate = false,
  className = "",
}: EnsoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-label="ENSO JOURNAL logo"
    >
      {/* 円相リング（共通ベース） */}
      <circle
        cx="50"
        cy="50"
        r="32"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        opacity="0.9"
      />
      {/* 3本線（グラデーション: 過去→現在で濃くなる） */}
      <line x1="38" y1="42" x2="62" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4">
        {animate && (
          <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="0s" fill="freeze" />
        )}
      </line>
      <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.65">
        {animate && (
          <animate attributeName="opacity" values="0;0.65" dur="0.3s" begin="0.15s" fill="freeze" />
        )}
      </line>
      <line x1="38" y1="58" x2="62" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="1">
        {animate && (
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze" />
        )}
      </line>
    </svg>
  );
}
