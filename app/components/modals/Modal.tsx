'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import Button from '@/app/components/Button';

import { IoMdClose } from 'react-icons/io';

interface ModalProps {
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	isOpen?: boolean;
	actionLabel: string;
	secondaryActionLabel?: string;
	secondaryAction?: () => void;
	onSubmit: () => void;
	onClose: () => void;
	disabled?: boolean;
}

const Modal: FC<ModalProps> = ({
	title,
	body,
	footer,
	isOpen,
	actionLabel,
	secondaryActionLabel,
	secondaryAction,
	onSubmit,
	onClose,
	disabled,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) return;

		setShowModal(false);

		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		<>
			<div className="flex items-center justify-center fixed inset-0 outline-none bg-neutral-800/70 overflow-x-hidden overflow-y-auto z-50 focus:outline-none">
				<div className="w-full h-full max-w-[500px] relative mx-auto my-6 md:w-4/6 md:h-auto lg:w-3/6 lg:h-auto xl:w-2/5">
					<div
						className={`h-full translate duration-300 ${
							showModal
								? 'translate-y-0 opacity-100'
								: 'translate-y-full opacity-0'
						}`}
					>
						<div className="w-full h-full flex flex-col relative border-0 rounded-lg outline-none bg-white shadow-lg translate focus:outline-none md:h-auto lg:h-auto">
							<div className="flex items-center justify-center relative p-6 border-b-[1px] rounded-t">
								<div className="font-semibold text-lg">{title}</div>
								<button
									className="absolute right-9 p-1 b-0 transition hover:opacity-70"
									onClick={handleClose}
								>
									<IoMdClose size={18} />
								</button>
							</div>
							<div className="flex-auto relative p-6">{body}</div>
							<div className="flex flex-col gap-2 p-6">
								<div className="w-full flex flex-row items-center gap-4">
									{secondaryAction && secondaryActionLabel && (
										<Button
											label={secondaryActionLabel}
											outline
											onClick={handleSecondaryAction}
											disabled={disabled}
										/>
									)}
									<Button
										label={actionLabel}
										onClick={handleSubmit}
										disabled={disabled}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
