import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BookService } from '../../utils/BookService'; 
import { Breadcrumb } from '../../components';
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
		const getSearchResult = (query) => {
			const data = BookService.search(query);
			
			

			setBooks(data);
		}

		getSearchResult(query)
	},[]); 
	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			Search
			query: {query}
		</div>
	)
}