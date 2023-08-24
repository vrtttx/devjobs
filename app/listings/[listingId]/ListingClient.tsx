'use client';

import { FC, useMemo } from 'react';

import { SafeListing, SafeUser } from '@/app/types';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import { categories } from '@/app/components/navbar/Categories';

interface ListingClientProps {
	currentUser?: SafeUser | null;
	listing: SafeListing & { user: SafeUser };
}

const ListingClient: FC<ListingClientProps> = ({ currentUser, listing }) => {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<ListingHead
					currentUser={currentUser}
					id={listing.id}
					imageSrc={listing.imageSrc}
					company={listing.company}
					employeeCount={listing.employeeCount}
					locationValue={listing.locationValue}
					title={listing.title}
					category={category}
					xpLevelValue={listing.xpLevelValue}
					xpCount={listing.xpCount}
					jobTypeValue={listing.jobTypeValue}
					visaValue={listing.visaValue}
					salary={listing.salary}
					jobApply={listing.jobApply}
				/>
				<div className="grid grid-cols-1 mt-10 md:grid-cols-7 md:gap-10">
					<ListingInfo user={listing.user} description={listing.description} />
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;

/*

// 	company: string;
// 	category: { icon: IconType; label: string };
// 	employeeCount: number;


*/

// const ListingClient: FC<ListingClientProps> = ({ currentUser, listing }) => {
// 	const category = useMemo(() => {
// 		return categories.find((item) => item.label === listing.category);
// 	}, [listing.category]);

// 	return (
// 		<Container>
// 			<div className="max-w-screen-lg mx-auto">
// 				<div className="flex flex-col gap-6">
// 					<ListingHead
// 						currentUser={currentUser}
// 						id={listing.id}
// 						title={listing.title}
// 						imageSrc={listing.imageSrc}
// 						locationValue={listing.locationValue}
// 					/>
// 					<div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
// 						<ListingInfo
// 							user={listing.user}
// 							company={listing.company}
// 							locationValue={listing.locationValue}
// 							category={category}
// 							employeeCount={listing.employeeCount}
// 							description={listing.description}
// 							xpLevelValue={listing.xpLevelValue}
// 							xpCount={listing.xpCount}
// 							jobTypeValue={listing.jobTypeValue}
// 							visaValue={listing.visaValue}
// 							salary={listing.salary}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</Container>
// 	);
// };

// export default ListingClient;
