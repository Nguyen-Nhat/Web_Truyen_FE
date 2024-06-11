import { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { GenreService, BookService } from '../../utils'
import { Breadcrumb, GenreList,  BookList } from '../../components';
import { ServerContext } from '../../context/ServerContext';
import { Spinner } from '@material-tailwind/react';
export const Author = ()=>{
	const { encodedUrl } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { server } = useContext(ServerContext);
	const breadcrumbItems = [
        { name: `Tác giả`, link: `/author/${encodedUrl}` },
    ];
	useEffect(() => {
		const page = searchParams.get('page') || 1;
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page })
	}, []);
	useEffect(() => {
		const getSearchResult = async () => {
			const page = searchParams.get('page') || '1';
			const data = await BookService.getByAuthor(decodeURIComponent(atob(encodedUrl)), page);
			setBooks(data);
		}
		const getGenres = async () => {
			const data = await GenreService.getGenres();
			if(data) setGenres(data);
		}

		setIsLoading(true);
		Promise.all([getSearchResult(), getGenres()]).then(() => setIsLoading(false));
	},[encodedUrl,searchParams, server]);
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
						<BookList title={`Truyện cùng tác giả`} books={books} />
						<GenreList genres={genres} />
					</div>
				)
			}
		</div>
	)
}