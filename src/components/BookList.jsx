import { Link } from 'react-router-dom';
import {Pagination} from './Pagination'
import { UserIcon } from "@heroicons/react/24/solid"
import {
	Typography,
	CardFooter,
} from "@material-tailwind/react"

export function BookList({title, books}) {
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
			{
				books.map((book , i) => {
					const lastUpdatedDate = new Date(book.lastDayUpdate);
					const currentDate = new Date();
					const differenceInTime = currentDate.getTime() - lastUpdatedDate.getTime();
					const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

					return (
						<div className='flex items-center h-[74px] border-b my-1' key={i}>
							<img src={book.coverImage} alt={book.title} className='w-[74px] h-[74px]' />
							<div className='ml-4'>
								<Link to={`/story/${book.title}`} className='hover:underline'>
									<Typography className='text-base'>{book.title}</Typography>
								</Link>
								<div className='flex items-center'>
									<UserIcon className='h-5 w-5 p-1'/>
									<Typography className='text-base text-gray-500'>{book.author}</Typography>
								</div>
							</div>
							<div className='ml-auto w-[150px]'>
								<Typography className='text-base'>{book.lastChapter}</Typography>
								<Typography className='text-sm text-gray-500'>
									{differenceInDays} ngày trước
								</Typography>
							</div>
						</div>
					)
				})
			}
			
            <CardFooter className='mx-auto -mt-4'>
				<Pagination pageLimit={1000} />
			</CardFooter>
		</div>
	);
}