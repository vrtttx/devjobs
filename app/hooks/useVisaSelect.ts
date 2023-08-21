export const visaOptions = [
	{
		label: 'Yes',
	},
	{
		label: 'No',
	},
];

const useVisaSelect = () => {
	const getAll = () => visaOptions;

	const getByValue = (value: string) => {
		return visaOptions.find((item) => item.label === value);
	};

	return { getAll, getByValue };
};

export default useVisaSelect;
