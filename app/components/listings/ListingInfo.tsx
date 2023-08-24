'use client';

import { FC } from 'react';

import { SafeUser } from '@/app/types';

import Avatar from '@/app/components/Avatar';

interface ListingInfoProps {
	user: SafeUser;
	description: string;
}

const ListingInfo: FC<ListingInfoProps> = ({ user, description }) => {
	return (
		<div className="flex flex-col col-span-7 gap-8">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center gap-3 font-semibold text-xl">
					<div className="pr-2 text-sm text-neutral-500">Posted by:</div>
					<Avatar src={user?.image} />
					<div className="text-base text-blue-950">{user?.name}</div>
				</div>
			</div>
			<div className="font-bold text-lg">Job Description:</div>
			<div className="h-[50vh] p-3 text-neutral-700 leading-7 rounded-xl overflow-y-auto">
				{description}
			</div>
		</div>
	);
};

export default ListingInfo;
