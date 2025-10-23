interface CalendarProps {
    className?: string;
    width?: number;
    height?: number;
    strokeColor?: string;
    fillColor?: string;
}

export default function Calendar({
    className,
    width = 24,
    height = 24,
    strokeColor = "currentColor",
    fillColor = "currentColor",
}: CalendarProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19 5H5V8H19V5Z" fill={fillColor} />
            <path
                d="M12 4H19C19.55 4 20 4.45 20 5V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V5C4 4.45 4.45 4 5 4H12Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 4V2M17 4V2"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 11H17"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 15H14"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
