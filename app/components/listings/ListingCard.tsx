'use client';

import { FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';

import { SafeListing, SafeUser } from '@/app/types';

import Image from 'next/image';

import Button from '@/app/components/Button';
import HeartButton from '@/app/components/HeartButton';

interface ListingCardProps {
	currentUser: SafeUser | null;
	data: SafeListing;
	actionId?: string;
	actionLabel?: string;
	disabled?: boolean;
	onAction?: (id: string) => void;
}

const ListingCard: FC<ListingCardProps> = ({
	currentUser,
	data,
	actionId = '',
	actionLabel,
	disabled,
	onAction,
}) => {
	const router = useRouter();

	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) return;

			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	return (
		<div className="group col-span-1">
			<div className="w-full flex flex-col gap-2 p-4 border-[1px] border-neutral-300 rounded-lg bg-white shadow-sm group-hover:shadow-lg">
				<div className="flex flex-row items-center gap-4">
					<div className="aspect-square w-[80px] relative rounded-xl overflow-hidden">
						<Image
							src={data.imageSrc}
							alt="Company Logo"
							className="w-full h-full object-cover transition group-hover:scale-105"
							fill
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<div className="font-light text-base text-neutral-600">
							{data.company}
						</div>
						<div className="font-bold text-base text-gray-950">
							{data.title}
						</div>
						<div className="font-light text-sm text-neutral-400">
							{location?.label}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between mt-2 font-light text-[12px] text-white">
					<div className="flex items-center justify-start gap-2">
						<div className="px-3 py-2 rounded-md bg-gray-950">
							{data.category}
						</div>
						<div className="px-3 py-2 rounded-md bg-gray-950">
							{data.xpLevelValue}
						</div>
						<div className="px-3 py-2 rounded-md bg-gray-950">
							{data.jobTypeValue}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-3 mt-2">
					<button
						className="w-full py-2 font-light text-sm text-white rounded-md bg-blue-600 transition hover:opacity-80"
						onClick={() => router.push(`/listings/${data.id}`)}
					>
						Check out!
					</button>
					<div className="">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				{onAction && actionLabel && (
					<Button
						small
						label={actionLabel}
						onClick={handleCancel}
						disabled={disabled}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;
