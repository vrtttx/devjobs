'use client';

import { FC } from 'react';

interface HeadingProps {
	title: string;
	subtitle?: string;
	center?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<div className="font-bold text-3xl text-gray-900">{title}</div>
			<div className="mt-2 font-light text-neutral-500">{subtitle}</div>
		</div>
	);
};

export default Heading;
