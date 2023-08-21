'use client';

import { FC } from 'react';

import Image from 'next/image';

interface AvatarProps {
	src: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
	return (
		<Image
			src={src || '/assets/images/placeholder.png'}
			alt="Avatar"
			width={30}
			height={30}
			className="rounded-full"
		/>
	);
};

export default Avatar;
