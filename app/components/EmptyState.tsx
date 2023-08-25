'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
	title = 'No exact matches',
	subtitle = 'Try changing or removing some of your filters',
	showReset,
}) => {
	const router = useRouter();

	return (
		<div className="h-[60vh] flex flex-col items-center justify-center gap-2 pt-16">
			<Heading title={title} subtitle={subtitle} center />
			<div className="w-48 mt-4">
				{showReset && (
					<Button
						outline
						label="Remove all filters"
						onClick={() => router.push('/')}
					/>
				)}
			</div>
		</div>
	);
};

export default EmptyState;
