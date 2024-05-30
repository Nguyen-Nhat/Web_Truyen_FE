import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { GenreService, BookService } from '../../utils'
import { Breadcrumb, GenreList,  BookList } from '../../components';
export const Genre = ()=>{
	const {slug} = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	
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

		getSearchResult()
		getGenres();
	},[slug,searchParams]); 
	return (
		<div className='mx-auto max-w-[1000px] mt-[20px]'>
			<Breadcrumb items={breadcrumbItems} />
			<div className='flex  mt-[10px]'>
				<BookList title={`Truyện cùng chủ đề`} books={books} />
				<GenreList genres={genres} />
			</div>
		</div>
	)
}