import { SVGProps } from "react";
import ContentLoader from "react-content-loader";

interface SkeletonLoaderProps extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    minRows?: number;
    maxRows?: number;
    speed?: number;
}

export function SkeletonLoader({
    width = 400,
    height = 160,
    minRows = 2,
    maxRows = 6,
    speed = 2,
    ...props
}: SkeletonLoaderProps) {
    // Randomly determine the number of rows between minRows and maxRows
    const rows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;
    
    // Calculate the height for each row based on the total height and number of rows
    const rowHeight = height / rows;

    return (
        <ContentLoader 
            // @ts-ignore
            speed={speed}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor="#fefefe"
            foregroundColor="#eeeeee"
            {...props}
        >
            {Array.from({ length: rows }).map((_, index) => {
                // Randomly determine the width and height of each rectangle
                const rectWidth = Math.random() * (width - 20) + 20; // Random width between 20 and width - 20
                const rectHeight = rowHeight - 10;
                const x = Math.random() * (width - rectWidth); // Random x position within the bounds
                const y = index * rowHeight;

                return (
                    <rect
                        key={index}
                        x={x}
                        y={y}
                        rx="3"
                        ry="3"
                        width={rectWidth}
                        height={rectHeight}
                    />
                );
            })}
        </ContentLoader>
    );
};
