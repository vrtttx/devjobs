'use client';

import { FC } from 'react';

import { IconType } from 'react-icons';

interface ButtonProps {
	label: string;
	icon?: IconType;
	small?: boolean;
	outline?: boolean;
	disabled?: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
	label,
	icon: Icon,
	small,
	outline,
	disabled,
	onClick,
}) => {
	return (
		<button
			className={`w-full relative rounded-lg transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed ${
				small
					? 'py-1 font-light text-sm border-[1px]'
					: 'py-3 font-semibold text-md border-2'
			} ${
				outline
					? 'text-black border-black bg-white'
					: 'text-white border-blue-600 bg-blue-600'
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{Icon && <Icon size={24} className="absolute top-3 left-4" />}
			{label}
		</button>
	);
};

export default Button;
