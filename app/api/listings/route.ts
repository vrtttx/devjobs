import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const {
		title,
		description,
		imageSrc,
		category,
		company,
		employeeCount,
		xpCount,
		location,
		visaValue,
		xpLevelValue,
		jobTypeValue,
		salary,
		jobApply,
	} = body;

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			company,
			employeeCount,
			xpCount,
			locationValue: location.value,
			visaValue: visaValue.label,
			xpLevelValue: xpLevelValue.label,
			jobTypeValue: jobTypeValue.label,
			salary: parseInt(salary, 10),
			jobApply,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}
