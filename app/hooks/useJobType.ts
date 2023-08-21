export const jobTypeOptions = [
	{
		label: 'Full-Time',
	},
	{
		label: 'Part-Time',
	},
	{
		label: 'Temporary',
	},
	{
		label: 'Freelance',
	},
	{
		label: 'Internship',
	},
];

const useJobType = () => {
	const getAll = () => jobTypeOptions;

	const getByValue = (value: string) => {
		return jobTypeOptions.find((item) => item.label === value);
	};

	return { getAll, getByValue };
};

export default useJobType;
