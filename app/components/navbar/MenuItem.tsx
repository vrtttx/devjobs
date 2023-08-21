'use client';

import { FC } from 'react';

interface MenuItemProps {
	label: string;
	onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
	return (
		<div
			className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
			onClick={onClick}
		>
			{label}
		</div>
	);
};

export default MenuItem;
