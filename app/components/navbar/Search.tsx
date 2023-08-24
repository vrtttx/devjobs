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
			className="w-full px-2 py-2 border-[1px] rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto"
			onClick={searchModal.onOpen}
		>
			<div className="w-full flex flex-row items-center justify-between md:w-[250px]">
				<div className="px-4 font-semibold text-sm text-gray-950">
					{locationLabel}
				</div>
				<div className="p-2 text-white rounded-full bg-blue-600">
					<BiSearch size={16} />
				</div>
			</div>
		</div>
	);
};

export default Search;
