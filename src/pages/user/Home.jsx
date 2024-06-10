import { useState, useEffect, useContext } from 'react';
import { Breadcrumb, GenreList, BookGrid } from '../../components';
import { GenreService, BookService } from '../../utils';
import { ServerContext } from '../../context/ServerContext';
import { Spinner } from '@material-tailwind/react';
export const Home = ()=>{
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { server } = useContext(ServerContext);
	const breadcrumbItems = [];
	useEffect(() => {
		const getRecommendation = async () => {
			const data = await BookService.getRecommendation();
			if(data) setBooks(data);
		};
		const getGenres = async () => {
			const data = await GenreService.getGenres();
			if(data) setGenres(data);
		}
		setIsLoading(true);
		Promise.all([getRecommendation(), getGenres()]).then(() => setIsLoading(false));
	},[server]); 
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
					<div className='flex  mt-[10px]'>
						<BookGrid title={`TRUYỆN ĐỀ CỬ`} books={books} />
						<GenreList genres={genres} />
					</div>
				)
			}
		</div>
	)
}