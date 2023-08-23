'use client';

import { FC } from 'react';

import { IconType } from 'react-icons';

interface CategoryInputProps {
	label: string;
	icon: IconType;
	selected?: boolean;
	onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
	label,
	icon: Icon,
	selected,
	onClick,
}) => {
	return (
		<div
			className={`flex flex-col gap-3 p-4 border-2 rounded-xl cursor-pointer transition hover:border-black ${
				selected ? 'border-blue-600' : 'border-neutral-200'
			}`}
			onClick={() => onClick(label)}
		>
			<Icon size={30} />
			<div className="font-semibold">{label}</div>
		</div>
	);
};

export default CategoryInput;
