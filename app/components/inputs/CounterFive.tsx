'use client';

import { FC, useCallback } from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterFiveProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

const CounterFive: FC<CounterFiveProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAddFive = useCallback(() => {
		onChange(value + 5);
	}, [value, onChange]);

	const onReduceFive = useCallback(() => {
		if (value === 5) return;

		onChange(value - 5);
	}, [value, onChange]);

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<div className="flex flex-row items-center gap-4">
				<div
					className="w-10 h-10 flex items-center justify-center text-neutral-600 border-[1px] rounded-full border-neutral-400 cursor-pointer transition hover:opacity-80"
					onClick={onReduceFive}
				>
					<AiOutlineMinus />
				</div>
				<div className="font-light text-xl text-neutral-600">{value}</div>
				<div
					className="w-10 h-10 flex items-center justify-center text-neutral-600 border-[1px] rounded-full border-neutral-400 cursor-pointer transition hover:opacity-80"
					onClick={onAddFive}
				>
					<AiOutlinePlus />
				</div>
			</div>
		</div>
	);
};

export default CounterFive;
