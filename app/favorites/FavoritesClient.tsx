import { FC } from 'react';

import { SafeListing, SafeUser } from '../types';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';

interface FavoritesClientProps {
	currentUser: SafeUser | null;
	listings: SafeListing[];
}

const FavoritesClient: FC<FavoritesClientProps> = ({
	currentUser,
	listings,
}) => {
	return (
		<Container>
			<Heading title="Favorites" subtitle="List of jobs you have favorited!" />
			<div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-5 2xl:gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						currentUser={currentUser}
						data={listing}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;
