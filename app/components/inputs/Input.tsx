'use client';

import { FC } from 'react';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { BiDollar } from 'react-icons/bi';

interface InputProps {
	id: string;
	label: string;
	type?: string;
	register: UseFormRegister<FieldValues>;
	formatSalary?: boolean;
	required?: boolean;
	disabled?: boolean;
	errors: FieldErrors;
}

const Input: FC<InputProps> = ({
	id,
	label,
	type,
	register,
	formatSalary,
	required,
	disabled,
	errors,
}) => {
	return (
		<div className="w-full relative">
			{formatSalary && (
				<BiDollar
					size={22}
					classname="absolute top-9 left-3 text-neutral-700"
				/>
			)}
			<input
				id={id}
				type={type}
				placeholder=" "
				className={`peer w-full p-2.5 pt-6 pl-7 font-light border-2 rounded-lg outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${
					formatSalary ? 'pl-11 mt-4' : 'pl-4'
				} ${
					errors[id]
						? 'border-rose-500 focus:border-rose-500'
						: 'border-neutral-300 focus:border-black'
				}`}
				{...register(id, { required })}
				disabled={disabled}
			/>
			<label
				className={`absolute top-5 left-7 text-sm transform origin-[0] -translate-y-3 duration-150 z-10 ${
					formatSalary ? 'top-9 left-11' : 'left-4'
				} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
					errors[id] ? 'text-rose-500' : 'text-zinc-400'
				}`}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
