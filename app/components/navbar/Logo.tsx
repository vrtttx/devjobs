'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';

const Logo = () => {
	const router = useRouter();

	return (
		<div className="hidden items-center gap-3 sm:flex">
			<Image
				src="/assets/images/logo-icon-color.png"
				alt="DevJobs Logo Icon"
				width={42}
				height={42}
				className="cursor-pointer"
				onClick={() => router.push('/')}
			/>
			<h1 className="font-extrabold text-2xl text-emerald-800 tracking-wide">
				Dev<span className="font-medium text-emerald-600">Jobs</span>
			</h1>
		</div>
	);
};

export default Logo;
