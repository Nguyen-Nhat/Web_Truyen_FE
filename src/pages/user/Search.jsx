import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BookService } from '../../utils/BookService'; 
import { Breadcrumb } from '../../components';
import { UserIcon } from "@heroicons/react/24/solid"
import {
	Typography
} from "@material-tailwind/react"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Search = ()=>{
	const query = useQuery().get('q');
	const [books, setBooks] = useState([]);
	const breadcrumbItems = [
        { name: `Tìm kiếm ${query}`, link: `/search?q=${query}` },
    ];
	useEffect(() => {
		const getSearchResult = async (query) => {
			const data = await BookService.search(query);
			
			setBooks(data);
		}

		getSearchResult(query)
	},[query]); 
	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			<div
				className='w-full bg-white mt-[10px]'
			>
				<div className='w-full border px-[10px] py-[8px]'>
					<Typography
						className='text-[#2f52b2] text-lg font-semibold'
					>
						KẾT QUẢ TÌM KIẾM {query.toUpperCase()}
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
										<Typography className='text-xl'>{book.title}</Typography>
									</Link>
									<div className='flex items-center'>
										<UserIcon className='mr-2 h-5 w-5 p-1'/>
										<Typography className='text-lg text-gray-500'>{book.author}</Typography>
									</div>
								</div>
								<div className='ml-auto w-[150px]'>
									<Typography className='text-lg'>{book.lastChapter}</Typography>
									<Typography className='text-sm text-gray-500'>
										{differenceInDays} ngày trước
									</Typography>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}