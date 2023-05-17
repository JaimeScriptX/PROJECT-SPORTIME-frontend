

export const CircularProgress = ({ value, total }:{value:number, total:number}) => {

    const libre = total;
    const totalP = total * 2
    const radius = 45;
    const strokeWidth = 7.5;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = value / totalP;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="inline-flex items-center justify-center relative">
      <svg className="w-50 h-40">
      <circle
          className="text-portada"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="rgba(255, 255, 255, 0.85)"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <span className="absolute left-6 text-sm text-center font-n27" style={{top:'1rem'}}>
        Quedan<br />
       {libre}<br />
        plazas
      </span>
    </div>
  )
}
