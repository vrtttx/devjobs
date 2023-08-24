'use client';

import { FC } from 'react';

import useExperienceLevel from '@/app/hooks/useExperienceLevel';

import Select from 'react-select';

export type ExperienceLevelValue = {
	label: string;
};

interface ExperienceLevelProps {
	title: string;
	subtitle: string;
	value?: ExperienceLevelValue;
	onChange: (value: ExperienceLevelValue) => void;
}

const ExperienceLevel: FC<ExperienceLevelProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const { getAll } = useExperienceLevel();

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
				placeholder="Any Level"
				onChange={(value) => onChange(value as ExperienceLevelValue)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.label}</div>
					</div>
				)}
				className="w-full"
				classNames={{
					control: () => 'p-2 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: { ...theme.colors, primary25: '#f9f9f9' },
				})}
				isClearable
			/>
		</div>
	);
};

export default ExperienceLevel;
