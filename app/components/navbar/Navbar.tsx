import { FC } from 'react';

import { SafeUser } from '@/app/types';

import Logo from './Logo';
import Search from './Search';

import Container from '@/app/components/Container';
import UserMenu from './UserMenu';
import Categories from './Categories';

interface NavbarProps {
	currentUser?: SafeUser | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className="w-full fixed bg-gray-50 shadow-sm z-10">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;
