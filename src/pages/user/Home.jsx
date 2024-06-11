import { useState, useEffect, useContext } from 'react';
import { Breadcrumb, GenreList, BookGrid, RecentBookGrid } from '../../components';
import { GenreService, BookService } from '../../utils';
import { ServerContext } from '../../context/ServerContext';
import { Spinner } from '@material-tailwind/react';
export const Home = () => {
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { server } = useContext(ServerContext);
	const breadcrumbItems = [];
	useEffect(() => {
		const getRecommendation = async () => {
			const data = await BookService.getRecommendation();
			if (data) setBooks(data);
		};
		const getGenres = async () => {
			const data = await GenreService.getGenres();
			if (data) setGenres(data);
		}
		setIsLoading(true);
		Promise.all([getRecommendation(), getGenres()]).then(() => setIsLoading(false));
	}, [server]);
	const temp = localStorage.getItem('historyReader');
	let list;
	if (temp) {
		const temp1 = JSON.parse(temp);
		list = temp1.map(book => ({
			...book,
			urlStory: book.url.substring(0, book.url.lastIndexOf('/')),
			urlChap: book.url.substring(book.url.lastIndexOf('/') + 1)
		}));

	} else {
		list = null;
	}

	return (
		<div
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			{
				isLoading ? (
					<div className="flex items-center justify-center h-screen">
						<Spinner />
					</div>
				) : (
					<>
						<div className='flex  mt-[10px]'>
							<BookGrid title={`TRUYỆN ĐỀ CỬ`} books={books} />
							<GenreList genres={genres} />
						</div>
						<div className='flex  mt-[10px]'>
							<RecentBookGrid title={`TRUYỆN ĐỌC GẦN ĐÂY`} books={list.reverse()} />
						</div>
					</>
				)
			}
		</div>
	)
}