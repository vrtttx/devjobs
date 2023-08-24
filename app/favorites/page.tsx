import getFavoriteListings from '../actions/getFavoriteListings';
import getCurrentUser from '../actions/getCurrentUser';

import FavoritesClient from './FavoritesClient';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

const ListingPage = async () => {
	const currentUser = await getCurrentUser();
	const listings = await getFavoriteListings();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No favorites found..."
					subtitle="Looks like you have no favorite listings."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient currentUser={currentUser} listings={listings} />
		</ClientOnly>
	);
};

export default ListingPage;
