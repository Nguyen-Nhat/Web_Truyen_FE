import { useState, useEffect,  useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GenreService, BookService } from '../../utils'
import { Breadcrumb, GenreList,  BookList } from '../../components';
import { ServerContext } from '../../context/ServerContext';
export const Search = ()=>{
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const { server } = useContext(ServerContext);
	
	const getPage = () => {
		return +searchParams.get('page') || 1;
	}
	const getQuery = () => {
		return searchParams.get('q');
	}
	const breadcrumbItems = [
        { name: `Tìm kiếm ${getQuery()}`, link: `/search?q=${getPage()}` },
    ];
	useEffect(() => {
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: getPage() })
	}, []);
	useEffect(() => {
		const getSearchResult = async () => {
			const page = searchParams.get('page') || '1';
			const query = searchParams.get('q');
			const data = await BookService.searchByName(query, page);
			if(data) setBooks(data);
		}
		const getGenres = async () => {
			const data = await GenreService.getGenres();
			if(data) setGenres(data);
		}

		getSearchResult()
		getGenres();
	},[searchParams,server]); 
	return (
		<div className='mx-auto max-w-[1000px] mt-[20px]'>
			<Breadcrumb items={breadcrumbItems} />
			<div className='flex flex-wrap mt-[10px]'>
				<div className='flex-grow'>
				<BookList title={`KẾT QUẢ TÌM KIẾM ${getQuery().toUpperCase()}`} books={books} />
				</div>
				<GenreList genres={genres} />
			</div>
		</div>
	)
}