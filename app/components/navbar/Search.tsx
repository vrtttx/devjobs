'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
	const params = useSearchParams();
	const searchModal = useSearchModal();
	const { getByValue } = useCountries();

	const locationValue = params?.get('locationValue');

	const locationLabel = useMemo(() => {
		if (locationValue) return getByValue(locationValue as string)?.label;

		return 'Anywhere';
	}, [locationValue, getByValue]);

	return (
		<div
			className="w-full px-4 py-2 border-[1px] rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto"
			onClick={searchModal.onOpen}
		>
			<div className="w-full flex flex-row items-center justify-between md:w-[250px]">
				<div className="px-2 font-semibold text-sm text-emerald-800">
					{locationLabel}
				</div>
				<div className="p-2 text-white rounded-full bg-emerald-500">
					<BiSearch size={14} />
				</div>
			</div>
		</div>
	);
};

export default Search;
