import { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { GenreService, BookService } from '../../utils'
import { Breadcrumb, GenreList,  BookList } from '../../components';
import { ServerContext } from '../../context/ServerContext';
import { Spinner } from '@material-tailwind/react';
export const Genre = ()=>{
	const {slug} = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { server } = useContext(ServerContext);
	
	const breadcrumbItems = [
        { name: `Thể loại`, link: `/genre/${slug}` },
    ];
	useEffect(() => {
		const page = searchParams.get('page') || 1;
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page })
	}, []);
	useEffect(() => {
		const getSearchResult = async () => {
			const page = searchParams.get('page') || '1';
			const data = await BookService.searchByGenre(slug, page);
			if(data) setBooks(data);
		}
		const  getGenres = async () => {
			const data = await GenreService.getGenres();
			if(data) setGenres(data);
		}

		setIsLoading(true);
		Promise.all([getSearchResult(), getGenres()]).then(() => setIsLoading(false));
	},[slug,searchParams, server]); 
	return (
		<div className='mx-auto max-w-[1000px] mt-[20px]'>
			<Breadcrumb items={breadcrumbItems} />
			{
				isLoading ? (
					<div className="flex items-center justify-center h-screen">
						<Spinner />
					</div>
				) : (
					<div className='flex  mt-[10px]'>
						<BookList title={`Truyện cùng chủ đề`} books={books} />
						<GenreList genres={genres} />
					</div>
				)
			}
		</div>
	)
}