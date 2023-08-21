import './globals.css';

import type { Metadata } from 'next';

import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from '@/app/components/ClientOnly';

import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Devjobs | Land your dream job with ease and efficiency!',
	description:
		'A developer job platform where users can filter and apply for opportunities based on their preferred language and technology.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<ClientOnly>
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
