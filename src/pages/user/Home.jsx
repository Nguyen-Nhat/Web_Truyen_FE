import { useState, useEffect, useContext } from 'react';
import { Breadcrumb, GenreList, BookGrid } from '../../components';
import { GenreService, BookService } from '../../utils';
import { ServerContext } from '../../context/ServerContext';
export const Home = ()=>{
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
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
		getRecommendation();
		getGenres();
	},[server]); 
	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			<div className='flex  mt-[10px]'>
				<BookGrid title={`TRUYỆN ĐỀ CỬ`} books={books} />
				<GenreList genres={genres} />
			</div>
		</div>
	)
}