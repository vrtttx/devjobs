'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
	const router = useRouter();

	return (
		<div className="hidden items-center gap-3 sm:flex">
			<Image
				src="/assets/images/logo-icon-blue.png"
				alt="DevJobs Logo Icon"
				width={42}
				height={42}
				className="cursor-pointer"
				onClick={() => router.push('/')}
			/>
			<Link
				href={'/'}
				className="font-extrabold text-[1.75rem] text-gray-950 tracking-wide"
			>
				Dev<span className="font-medium text-blue-500">Jobs</span>
			</Link>
		</div>
	);
};

export default Logo;
