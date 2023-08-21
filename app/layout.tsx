import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';

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
				<Navbar />
				{children}
			</body>
		</html>
	);
}
