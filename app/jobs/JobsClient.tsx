'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '../types';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';

interface JobsClientProps {
	currentUser: SafeUser | null;
	listings: SafeListing[];
}

const JobsClient: FC<JobsClientProps> = ({ currentUser, listings }) => {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success('Job deleted.');
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading title="My Jobs" subtitle="List of the jobs you've posted!" />
			<div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-5 2xl:gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel="Delete job"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default JobsClient;
