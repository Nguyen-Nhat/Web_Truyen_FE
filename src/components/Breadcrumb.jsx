import { HomeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import {Typography} from '@material-tailwind/react';
export function Breadcrumb({ items }) {
	return (
		<div className="breadcrumb h-[40px] text-sm flex items-center">
			<Link to="/">
				<div className="flex items-center">
					<HomeIcon className='h-5 w-5 p-1'/>
					<Typography
						as="h5"
					>
						Trang chủ
					</Typography>
				</div>
			</Link>
			{items.map((item, index) => (
				<span key={index} className='flex items-center'>

					<span
						className='p-1'
					>
						&gt;
					</span>
					<Link to={item.link} >
						<Typography
							as="h5"
						>
							{item.name}
						</Typography>
					</Link>
				</span>
			))}
		</div>
	);
}