import { HomeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
export function Breadcrumb({ items }) {
	return (
		<div className="breadcrumb h-[40px] text-sm flex items-center">
			<Link to="/" className="flex items-center flex-shrink-0">
				<HomeIcon className="h-5 w-5 p-1 flex-shrink-0" />
				<Typography as="h5" className="flex-shrink-0">
					Trang chủ
				</Typography>
			</Link>
			{items.map((item, index) => (
				<span key={index} className="flex items-center flex-shrink-0">
					<span className="p-1 flex-shrink-0">&gt;</span>
					<Link to={item.link} className="flex-shrink-0">
						<Typography as="h5" className="flex-shrink-0">
							{item.name}
						</Typography>
					</Link>
				</span>
			))}
		</div>
	);
}