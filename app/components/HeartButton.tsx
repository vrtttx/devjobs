'use client';

import { FC } from 'react';

import useFavorite from '../hooks/useFavorite';

import { SafeUser } from '../types';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
	currentUser?: SafeUser | null;
	listingId: string;
}

const HeartButton: FC<HeartButtonProps> = ({ currentUser, listingId }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		currentUser,
		listingId,
	});

	return (
		<div
			className="relative cursor-pointer transition hover:opacity-80"
			onClick={toggleFavorite}
		>
			<AiOutlineHeart
				size={28}
				className="absolute -top-[2px] -right-[2px] fill-white"
			/>
			<AiFillHeart
				size={24}
				className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
			/>
		</div>
	);
};

export default HeartButton;
