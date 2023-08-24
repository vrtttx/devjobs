'use client';

import { FC } from 'react';

import useVisaSelect from '@/app/hooks/useVisaSelect';

import Select from 'react-select';

export type VisaSelectValue = {
	label: string;
};

interface VisaSelectProps {
	title: string;
	subtitle: string;
	value?: VisaSelectValue;
	onChange: (value: VisaSelectValue) => void;
}

const VisaSelect: FC<VisaSelectProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const { getAll } = useVisaSelect();

	const options = getAll().map((item) => ({
		label: item.label,
	}));

	return (
		<div className="flex flex-col items-start gap-4">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>
			<Select
				value={value}
				options={options}
				placeholder="Select an answer..."
				onChange={(value) => onChange(value as VisaSelectValue)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.label}</div>
					</div>
				)}
				className="w-full"
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: { ...theme.colors, primary25: '#e4eeff' },
				})}
				isClearable
			/>
		</div>
	);
};

export default VisaSelect;
