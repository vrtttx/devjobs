'use client';

import { FC } from 'react';

import useCountries from '@/app/hooks/useCountries';

import Select from 'react-select';

export type CountrySelectValue = {
	label: string;
	region: string;
	value: string;
	latlng: number[];
	flag: string;
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
	const { getAll } = useCountries();

	return (
		<Select
			value={value}
			options={getAll()}
			placeholder="Anywhere"
			onChange={(value) => onChange(value as CountrySelectValue)}
			formatOptionLabel={(option: any) => (
				<div className="flex flex-row items-center gap-3">
					<div>{option.flag}</div>
					<div>
						{option.label},{' '}
						<span className="ml-1 text-neutral-500">{option.region}</span>
					</div>
				</div>
			)}
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
	);
};

export default CountrySelect;
