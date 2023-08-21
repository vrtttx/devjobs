export const experienceOptions = [
	{
		label: 'Intern',
	},
	{
		label: 'Graduate',
	},
	{
		label: 'Junior',
	},
	{
		label: 'Mid-Level',
	},
	{
		label: 'Senior',
	},
	{
		label: 'Lead',
	},
];

const useExperienceLevel = () => {
	const getAll = () => experienceOptions;

	const getByValue = (value: string) => {
		return experienceOptions.find((item) => item.label === value);
	};

	return { getAll, getByValue };
};

export default useExperienceLevel;
