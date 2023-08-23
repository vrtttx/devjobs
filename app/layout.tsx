import getCurrentUser from './actions/getCurrentUser';

import type { Metadata } from 'next';

import ToastProvider from '@/app/providers/ToastProvider';

import ClientOnly from '@/app/components/ClientOnly';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
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
			<body className={nunito.className}>
				<ClientOnly>
					<ToastProvider />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
