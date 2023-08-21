'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import usePostJobModal from '@/app/hooks/usePostJobModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { signOut } from 'next-auth/react';

import { SafeUser } from '@/app/types';

import Avatar from '@/app/components/Avatar';
import MenuItem from './MenuItem';

import { AiOutlineMenu } from 'react-icons/ai';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const postJobModal = usePostJobModal();
	const registerModal = useRegisterModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onJobs = useCallback(() => {
		if (!currentUser) return loginModal.onOpen();

		postJobModal.onOpen();
	}, [currentUser, loginModal, postJobModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden px-4 py-3 font-semibold text-sm text-emerald-800 rounded-full cursor-pointer transition hover:bg-neutral-100 md:block"
					onClick={onJobs}
				>
					Post a Job
				</div>
				<div
					className="flex flex-row items-center gap-3 p-4 text-emerald-800 border-[1px] rounded-full border-neutral-200 cursor-pointer transition hover:shadow-md md:px-2 md:py-1"
					onClick={toggleOpen}
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="w-[48vw] absolute top-14 right-0 text-sm text-emerald-800 border-[1px] rounded-xl border-neutral-200 bg-white shadow-md overflow-hidden md:w-3/4 md:top-12">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									label="My Favorites"
									onClick={() => router.push('/favorites')}
								/>
								<MenuItem
									label="My Jobs"
									onClick={() => router.push('/jobs')}
								/>
								<MenuItem label="Post a Job" onClick={postJobModal.onOpen} />
								<hr />
								<MenuItem label="Logout" onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem label="Login" onClick={loginModal.onOpen} />
								<MenuItem label="Register" onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
