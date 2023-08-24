'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import usePostJobModal from '@/app/hooks/usePostJobModal';

import axios from 'axios';
import dynamic from 'next/dynamic';

import { toast } from 'react-hot-toast';

import Modal from './Modal';
import Heading from '@/app/components/Heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import Counter from '@/app/components/inputs/Counter';
import CounterFive from '@/app/components/inputs/CounterFive';
import CountrySelect from '@/app/components/inputs/CountrySelect';
import ExperienceLevel from '@/app/components/inputs/ExperienceLevel';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import JobType from '@/app/components/inputs/JobType';
import Textarea from '@/app/components/inputs/Textarea';
import VisaSelect from '@/app/components/inputs/VisaSelect';

import { categories } from '@/app/components/navbar/Categories';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	COMPANY = 3,
	IMAGE = 4,
	DESCRIPTION = 5,
	SALARY = 6,
	APPLY = 7,
}

const PostJobModal = () => {
	const router = useRouter();

	const postJobModal = usePostJobModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			title: '',
			description: '',
			imageSrc: '',
			category: '',
			company: '',
			employeeCount: 5,
			xpCount: 1,
			location: null,
			visaValue: null,
			xpLevelValue: null,
			jobTypeValue: null,
			salary: 1,
			jobApply: '',
		},
	});

	const imageSrc = watch('imageSrc');
	const category = watch('category');
	const employeeCount = watch('employeeCount');
	const xpCount = watch('xpCount');
	const location = watch('location');
	const visaValue = watch('visaValue');
	const xpLevelValue = watch('xpLevelValue');
	const jobTypeValue = watch('jobTypeValue');

	const Map = useMemo(
		() => dynamic(() => import('../Map'), { ssr: false }),
		[]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.APPLY) return onNext();

		setIsLoading(true);

		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Job Created!');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				postJobModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.APPLY) return 'Create';

		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) return undefined;

		return 'Back';
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Pick a Category!"
				subtitle="Which one is the main technology you are seeking?"
				center
			/>
			<div className="max-h-[50vh] grid grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							icon={item.icon}
							label={item.label}
							selected={category === item.label}
							onClick={(category) => setCustomValue('category', category)}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Location"
					subtitle="Where is this opening located?"
					center
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue('location', value)}
				/>
				{/* <Map center={location?.latlng} /> */}
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Job Information"
					subtitle="Share some information about this position."
					center
				/>
				<JobType
					title="Job Type"
					subtitle=""
					value={jobTypeValue}
					onChange={(value) => setCustomValue('jobTypeValue', value)}
				/>
				<hr />
				<ExperienceLevel
					title="Experience Level"
					subtitle=""
					value={xpLevelValue}
					onChange={(value) => setCustomValue('xpLevelValue', value)}
				/>
				<Counter
					title="Years of Experience"
					subtitle=""
					value={xpCount}
					onChange={(value) => setCustomValue('xpCount', value)}
				/>
				<hr />
				<VisaSelect
					title="Visa Sponsorship"
					subtitle=""
					value={visaValue}
					onChange={(value) => setCustomValue('visaValue', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.COMPANY) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Company"
					subtitle="Share a little about your company."
					center
				/>
				<Input
					id="company"
					label="Company Name"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<CounterFive
					title="Company Size"
					subtitle="How many employees do you have?"
					value={employeeCount}
					onChange={(value) => setCustomValue('employeeCount', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.IMAGE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Company's Logo"
					subtitle="Sharing your logo makes it easier to identify you!"
					center
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue('imageSrc', value)}
				/>
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Job Description"
					subtitle="A short name works best (E.g.: Software Engineer)."
					center
				/>
				<Input
					id="title"
					label="Job Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Textarea
					id="description"
					label="Job Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.SALARY) {
		bodyContent = (
			<div className="flex flex-col gap-4">
				<Heading
					title="Salary"
					subtitle="How much is the annual income for this position?"
					center
				/>
				<Input
					id="salary"
					label="Salary"
					formatSalary
					type="number"
					register={register}
					disabled={isLoading}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.APPLY) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Application"
					subtitle="Where should the candidate apply for this job? (E.g.: https://linkedin.com/in/...)"
					center
				/>
				<Input
					id="jobApply"
					label="Application"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			title="Post a Job"
			body={bodyContent}
			isOpen={postJobModal.isOpen}
			actionLabel={actionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
			onSubmit={handleSubmit(onSubmit)}
			onClose={postJobModal.onClose}
		/>
	);
};

export default PostJobModal;
