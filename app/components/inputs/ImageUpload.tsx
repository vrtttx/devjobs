'use client';

import { FC, useCallback } from 'react';

import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			options={{ maxFiles: 1 }}
			uploadPreset="qxr27xdn"
			onUpload={handleUpload}
		>
			{({ open }) => {
				return (
					<div
						className="flex flex-col items-center justify-center gap-4 relative p-20 text-neutral-600 border-2 border-dashed border-neutral-300 cursor-pointer transition hover:opacity-70"
						onClick={() => open?.()}
					>
						<TbPhotoPlus size={50} />
						<div className="font-semibold text-lg">
							Click to Upload an Image
						</div>
						{value && (
							<div className="w-full h-full absolute inset-0">
								<Image
									src={value}
									alt="Upload"
									style={{ objectFit: 'cover' }}
									fill
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
