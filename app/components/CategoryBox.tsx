'use client';

import { FC, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { IconType } from 'react-icons';

import qs from 'query-string';

interface CategoryBoxProps {
	icon: IconType;
	label: string;
	selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) currentQuery = qs.parse(params.toString());

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		if (params?.get('category') === label) delete updatedQuery.category;

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, params, router]);

	return (
		<div
			className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 cursor-pointer transition hover:text-neutral-600 ${
				selected ? 'border-b-blue-800' : 'border-transparent'
			} ${selected ? 'text-blue-500' : 'text-neutral-500'}`}
			onClick={handleClick}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;
