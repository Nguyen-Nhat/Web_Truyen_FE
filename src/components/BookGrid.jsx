
import { Link } from 'react-router-dom';
import {
	Typography,
} from "@material-tailwind/react"
export function BookGrid({title, books}){
	return (
		<div
			className='max-w-full h-fit w-[680px] bg-white'
		>
			<div className='border px-[10px] py-[8px]'>
				<Typography
					className='text-[#2f52b2] text-lg font-semibold'
				>
					{title}
				</Typography>
			</div>
			<div className='grid grid-cols-4 gap-4 p-4'>
				{books.map((book, index) => {
					const encodedUrl = btoa(book.url);
					return (
						<div key={index} className='flex flex-col items-center hover:opacity-80'>
							<Link to={`/story/${encodedUrl}`}>
								<img src={book.coverImage} alt={book.title} className='w-24 h-32' />
							</Link>
							<Link to={`/story/${encodedUrl}`}>
								<Typography className='mt-2 text-center hover:underline'>{book.title}</Typography>
							</Link>
							<Link to={`/author/${btoa(book.author.url)}?page=1`}>
								<Typography className='mt-1 text-sm text-gray-500 hover:underline'>{book.author.name}</Typography>
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	);
}
