'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Modal from './Modal';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: { email: '', passoword: '' } });

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success('Successfully logged in!');
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome Back!" subtitle="Login to your account." center />
			<Input
				id="email"
				label="Email"
				register={register}
				required
				disabled={isLoading}
				errors={errors}
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				register={register}
				required
				disabled={isLoading}
				errors={errors}
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				label="Sign in with Google"
				icon={FcGoogle}
				outline
				onClick={() => signIn('google')}
			/>
			<Button
				label="Sign in with Github"
				icon={AiFillGithub}
				outline
				onClick={() => signIn('github')}
			/>
			<div className="mt-4 font-light text-neutral-500 text-center">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>First time using DevJobs?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Register!
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			title="Login"
			body={bodyContent}
			footer={footerContent}
			actionLabel="Continue"
			isOpen={loginModal.isOpen}
			onSubmit={handleSubmit(onSubmit)}
			onClose={loginModal.onClose}
			disabled={isLoading}
		/>
	);
};

export default LoginModal;
