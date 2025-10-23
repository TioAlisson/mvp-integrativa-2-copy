interface PlusProps {
    className?: string;
    width?: number;
    height?: number;
    fillColor?: string;
}

export default function Plus({ className, width = 24, height = 24, fillColor = "currentColor", }: PlusProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 7.99805H8V13.998H6V7.99805H0V5.99805H6V-0.00195312H8V5.99805H14V7.99805Z"
                fill={fillColor}
            />
        </svg>
    );
}
