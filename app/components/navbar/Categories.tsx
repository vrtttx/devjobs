'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from '@/app/components/CategoryBox';
import Container from '@/app/components/Container';

import { FaJava } from 'react-icons/fa';
import {
	SiAngular,
	SiAssemblyscript,
	SiC,
	SiCplusplus,
	SiCsharp,
	SiClojure,
	SiDjango,
	SiDocker,
	SiGnuemacs,
	SiFortran,
	SiGo,
	SiHaskell,
	SiJavascript,
	SiJquery,
	SiJulia,
	SiKotlin,
	SiLaravel,
	SiLua,
	SiDotnet,
	SiNextdotjs,
	SiNodedotjs,
	SiOcaml,
	SiPhp,
	SiPython,
	SiR,
	SiReact,
	SiRuby,
	SiRust,
	SiScala,
	SiSvelte,
	SiSwift,
	SiTypescript,
	SiUnity,
	SiUnrealengine,
	SiVuedotjs,
	SiWebassembly,
	SiZig,
} from 'react-icons/si';

export const categories = [
	{ label: 'Angular', icon: SiAngular },
	{ label: 'Assembly', icon: SiAssemblyscript },
	{ label: 'C', icon: SiC },
	{ label: 'C++', icon: SiCplusplus },
	{ label: 'C#', icon: SiCsharp },
	{ label: 'Clojure', icon: SiClojure },
	{ label: 'Django', icon: SiDjango },
	{ label: 'Docker', icon: SiDocker },
	{ label: 'Emacs', icon: SiGnuemacs },
	{ label: 'Fortran', icon: SiFortran },
	{ label: 'Go', icon: SiGo },
	{ label: 'Haskell', icon: SiHaskell },
	{ label: 'Java', icon: FaJava },
	{ label: 'JavaScript', icon: SiJavascript },
	{ label: 'jQuery', icon: SiJquery },
	{ label: 'Julia', icon: SiJulia },
	{ label: 'Kotlin', icon: SiKotlin },
	{ label: 'Laravel', icon: SiLaravel },
	{ label: 'Lua', icon: SiLua },
	{ label: '.NET', icon: SiDotnet },
	{ label: 'Next.js', icon: SiNextdotjs },
	{ label: 'Node.js', icon: SiNodedotjs },
	{ label: 'OCaml', icon: SiOcaml },
	{ label: 'PHP', icon: SiPhp },
	{ label: 'Python', icon: SiPython },
	{ label: 'R', icon: SiR },
	{ label: 'React', icon: SiReact },
	{ label: 'Ruby', icon: SiRuby },
	{ label: 'Rust', icon: SiRust },
	{ label: 'Scala', icon: SiScala },
	{ label: 'Svelte', icon: SiSvelte },
	{ label: 'Swift', icon: SiSwift },
	{ label: 'TypeScript', icon: SiTypescript },
	{ label: 'Unity', icon: SiUnity },
	{ label: 'Unreal', icon: SiUnrealengine },
	{ label: 'Vue', icon: SiVuedotjs },
	{ label: 'WebAssembly', icon: SiWebassembly },
	{ label: 'Zig', icon: SiZig },
];

const Categories = () => {
	const pathname = usePathname();
	const params = useSearchParams();

	const category = params?.get('category');

	const isMainPage = pathname === '/';

	if (!isMainPage) return null;

	return (
		<Container>
			<div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						icon={item.icon}
						label={item.label}
						selected={category === item.label}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
