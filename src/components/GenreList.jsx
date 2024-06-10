import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { TagIcon } from '@heroicons/react/24/solid';

export function GenreList({ genres }){
	return (
		<div className='w-[300px] h-fit ml-[20px] bg-white'>
			<div className='w-full border px-[10px] py-[8px]'>
				<Typography className='text-[#2f52b2] text-lg font-semibold'>
					THỂ LOẠI TRUYỆN 
				</Typography>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				{genres.map((genre, index) => (
					<div key={index}>
						<Link to={`/genre/${genre.slug}?page=1`} className='hover:underline p-[6px] pl-[20px] text-[14px] flex items-center'>
							<TagIcon className='h-3 w-3 mr-1'/>
							{genre.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}