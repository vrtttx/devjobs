'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Modal from './Modal';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const RegisterModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { name: '', email: '', password: '' },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error('Something went wrong...');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to DevJobs!"
				subtitle="Create Your Account!"
				center
			/>
			<Input
				id="name"
				label="Name"
				register={register}
				errors={errors}
				disabled={isLoading}
				required
			/>
			<Input
				id="email"
				label="Email"
				register={register}
				errors={errors}
				disabled={isLoading}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				register={register}
				errors={errors}
				disabled={isLoading}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Sign Up with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Sign Up with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="mt-4 font-light text-neutral-500 text-center">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Sign In!
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			title="Register"
			body={bodyContent}
			footer={footerContent}
			isOpen={registerModal.isOpen}
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			disabled={isLoading}
			onClose={registerModal.onClose}
		/>
	);
};

export default RegisterModal;
