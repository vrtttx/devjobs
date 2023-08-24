import getCurrentUser from '@/app/actions/getCurrentUser';

import ToastProvider from '@/app/providers/ToastProvider';

import type { Metadata } from 'next';

import ClientOnly from '@/app/components/ClientOnly';
import LoginModal from '@/app/components/modals/LoginModal';
import PostJobModal from '@/app/components/modals/PostJobModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import Navbar from '@/app/components/navbar/Navbar';

import './globals.css';

import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Devjobs | Land your dream job with ease and efficiency!',
	description:
		'A developer job platform where users can filter and apply for opportunities based on their preferred language and technology.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={`bg-gray-100 ${nunito.className}`}>
				<ClientOnly>
					<ToastProvider />
					<LoginModal />
					<RegisterModal />
					<PostJobModal />
					<SearchModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
