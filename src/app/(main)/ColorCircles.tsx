interface ColorCirclesProps {
    color: string;
}

export default function ColorCircles({ color }: ColorCirclesProps) {
    return (
        <span className={`w-4 h-4 rounded-full inline-block ${color}`}></span>
    );
}