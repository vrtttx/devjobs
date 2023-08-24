'use client';

import { FC } from 'react';

import useCountries from '@/app/hooks/useCountries';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

import Image from 'next/image';

import ListingCategory from './ListingCategory';
import HeartButton from '@/app/components/HeartButton';
import Link from 'next/link';

interface ListingHeadProps {
	currentUser?: SafeUser | null;
	id: string;
	imageSrc: string;
	title: string;
	description: string;
	company: string;
	employeeCount: number;
	locationValue: string;
	category: { icon: IconType; label: string } | undefined;
	xpLevelValue: string;
	xpCount: number;
	jobTypeValue: string;
	visaValue: string;
	salary: number;
	jobApply: string;
}

const ListingHead: FC<ListingHeadProps> = ({
	currentUser,
	id,
	imageSrc,
	title,
	description,
	company,
	employeeCount,
	locationValue,
	category,
	xpLevelValue,
	xpCount,
	jobTypeValue,
	visaValue,
	salary,
	jobApply,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			<div className="w-full h-full pt-[7rem] pb-6">
				<div className="flex flex-col items-center justify-evenly gap-8 md:flex-row lg:gap-6">
					<div className="aspect-square w-[300px] relative rounded-xl overflow-hidden md:w-[320px] md:h-[45vh] lg:w-[430px] lg:h-full">
						<Image
							src={imageSrc}
							alt="Company Logo"
							className="w-full object-cover"
							fill
						/>
					</div>
					<div className="w-full flex flex-col gap-3">
						<div className="font-light text-xl text-neutral-600 lg:text-3xl">
							{company}
						</div>
						<div className="font-bold text-2xl lg:text-4xl">{title}</div>
						<div className="font-light text-base text-neutral-500 lg:text-xl">
							{location?.label}, {location?.region}
						</div>
						{category && (
							<ListingCategory icon={category.icon} label={category.label} />
						)}
						<hr />
						<div className="flex flex-col space-y-2 p-3 font-light text-sm text-blue-700 rounded-md border-gray-200 bg-white shadow-md lg:text-base">
							<div className="flex items-center gap-8">
								<div>
									<span className="text-neutral-600">Job Type:</span>{' '}
									{jobTypeValue}
								</div>
								<div>
									<span className="text-neutral-600">Salary: $</span> {salary} /
									Year
								</div>
							</div>
							<div className="flex items-center gap-8">
								<div>
									<span className="text-neutral-600">Experience Level:</span>{' '}
									{xpLevelValue}
								</div>
								<div>
									<span className="text-neutral-600">Years of Experience:</span>{' '}
									{xpCount}
								</div>
							</div>
							<div className="flex items-center gap-8">
								<div>
									<span className="text-neutral-600">Company Size:</span>{' '}
									{employeeCount} Employees
								</div>
								<div>
									<span className="text-neutral-600">Visa Sponsorship:</span>{' '}
									{visaValue}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 mx-auto my-8">
					<div className="font-light text-lg text-gray-500 lg:text-xl">
						Job Description
					</div>
					<hr />
					<div className="font-base text-base lg:text-lg">{description}</div>
					<hr />
				</div>
				<div className="w-full flex flex-row items-center justify-between gap-8">
					<button className="w-full rounded-md transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed py-3 font-semibold text-md border-2 text-white border-blue-600 bg-blue-600">
						<Link href={jobApply} target="_blank">
							Apply
						</Link>
					</button>
					<HeartButton currentUser={currentUser} listingId={id} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
