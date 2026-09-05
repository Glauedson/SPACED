import { twMerge } from 'tailwind-merge';

interface LoadSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  circle?: boolean;
}

export default function LoadSkeleton({
  count = 1,
  circle = false,
  className,
  ...props
}: LoadSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={twMerge(
            'animate-pulse bg-gray-800 rounded-2xl',
            circle && 'rounded-full',
            count > 1 && 'mb-2',
            className
          )}
          {...props}
        />
      ))}
    </>
  );
}