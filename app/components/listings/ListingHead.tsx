'use client';

import { FC } from 'react';

import useCountries from '@/app/hooks/useCountries';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

import Image from 'next/image';

import ListingCategory from './ListingCategory';
import HeartButton from '@/app/components/HeartButton';

interface ListingHeadProps {
	currentUser?: SafeUser | null;
	id: string;
	imageSrc: string;
	title: string;
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
			<div className="w-full h-full">
				<div className="flex flex-col items-center justify-evenly gap-8 md:flex-row lg:gap-6">
					<div className="aspect-square w-[300px] relative rounded-xl overflow-hidden md:w-[320px] md:h-[45vh] lg:w-[500px] lg:h-full">
						<Image
							src={imageSrc}
							alt="Image"
							className="w-full object-cover"
							fill
						/>
					</div>
					<div className="flex flex-col gap-6">
						<div className="font-bold text-4xl">{title}</div>
						<div className="flex flex-col gap-2">
							<div className="font-semibold text-xl lg:text-2xl text-blue-950">
								{company}
							</div>
							<div className="flex flex-row items-center gap-6 font-medium text-sm text-neutral-500 lg:text-md">
								<div>
									{location?.label}, {location?.region}
								</div>
								<div>{employeeCount} Employees</div>
							</div>
						</div>
						<hr />
						<div className="w-full p-6 rounded-xl bg-neutral-100">
							<div className="mb-4 font-bold text-lg">Job Info:</div>
							<div className="w-full grid grid-cols-2 items-center justify-between gap-4 font-semibold text-sm text-blue-600 lg:text-base">
								{category && (
									<ListingCategory
										icon={category.icon}
										label={category.label}
									/>
								)}
								<div>
									<span className="text-xs text-neutral-500 lg:text-sm">
										Salary:{' '}
									</span>
									$ {salary}{' '}
									<span className="text-xs text-neutral-500 lg:text-sm">
										/ y
									</span>
								</div>
								<div>
									<span className="text-xs text-neutral-500 lg:text-sm">
										XP Level:{' '}
									</span>
									{xpLevelValue}
								</div>
								<div>
									<span className="text-xs text-neutral-500 lg:text-sm">
										XP:{' '}
									</span>
									{xpCount}{' '}
									<span className="text-xs text-neutral-500 lg:text-sm">
										Years
									</span>
								</div>
								<div>
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Job Type:{' '}
									</span>
									{jobTypeValue}
								</div>
								<div>
									<span className="text-xs text-neutral-500 lg:pr-1.5 lg:text-sm">
										Visa Sponsorship:{' '}
									</span>
									{visaValue}
								</div>
							</div>
						</div>
						<hr />
						<div className="flex flex-row items-center justify-between gap-4">
							<button
								className="w-[250px] rounded-full transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed py-3 font-semibold text-md border-2 text-white border-blue-600 bg-blue-600 lg:w-[300px]"
								onClick={() => window.open(jobApply, '_blank')}
							>
								Apply
							</button>
							<HeartButton currentUser={currentUser} listingId={id} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListingHead;
