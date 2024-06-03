import { useParams, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import {
	Typography, CardFooter
} from "@material-tailwind/react"
import { StarIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { TagIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { OverviewService, BookService } from '../../utils';
import { useState, useEffect, useContext } from 'react';
import { ServerContext } from '../../context/ServerContext';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '../../components/Pagination'

export const StoryOverview = () => {
	const { encodedUrl } = useParams();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const page = queryParams.get('page') || 1;

	const [overviewService, setoverviewService] = useState([]);
	const decodeUrl = atob(encodedUrl);
	const { server } = useContext(ServerContext);

	const [chapterInforByPage, setChapterInfor] = useState([]);
	const [booksReconmend, setBooks] = useState([]);

	useEffect(() => {
		const getRecommendation = async () => {
			const data = await BookService.getRecommendation();
			if (data) setBooks(data);
		};
		const getOverviewParams = async () => {
			const data = await OverviewService.getOverviewService(decodeUrl);
			if (data) setoverviewService(data);
		}
		const getChapterInfor = async () => {
			const data = await OverviewService.ChapterInforByPage(decodeUrl, page);
			if (data) setChapterInfor(data);
		}
		getOverviewParams()
		getRecommendation();
		getChapterInfor();
	}, [server, page]);
	const randomBooksReconmend = booksReconmend.sort(() => 0.5 - Math.random()).slice(0, 5);


	const breadcrumbItems = [
		{ name: `${overviewService.title}`, link: `/story/${encodedUrl}` },
	];
	const navigate = useNavigate();

	const targetRef = useRef(null);

	const scrollToTarget = () => {
		targetRef.current.scrollIntoView({ behavior: 'smooth' });
	};
	console.log(overviewService);
	return (
		<div
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />

			<div className="mx-auto container ">
				<div className="grid grid-cols-12 gap-4 ">
					<div className=" col-span-9 p-4  flex flex-col" >
						<div className="grid grid-cols-4 gap-4  border-b border-gray-500 border-dashed">
							<div className="col-span-1  rounded-md mb-2">
								<img src={overviewService.coverImage}
									alt="Title" className='w-[180px] h-[180px]' />
							</div>
							<div className="col-span-3  ">
								<Typography className='text-2xl text-red-500 text-center'>{overviewService.title}</Typography>
								<div className="flex items-center justify-center pb-2">
									<Typography className='text-sm text-center '>
										Đánh giá <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{overviewService.rating}/10</span>
									</Typography>
									<StarIcon className="h-6 w-6 text-yellow-500" />
									<Typography className='text-sm text-center '>
										từ <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{overviewService.totalRating}</span> lượt
									</Typography>
								</div>
								<div className="flex flex-row justify-center">
									<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-500" onClick={scrollToTarget}>
										Danh sách chương
									</button>
									<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2 hover:bg-gray-500" onClick={() => navigate('/trangyeuthich')}>
										Trang yêu thích
									</button>
								</div>

								<div className="flex justify-center mt-2">

									<button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-500" onClick={() => navigate(`/story/${encodedUrl}/1`)}>
										Đọc từ đầu
									</button>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4  ">
							<div className="col-span-1  mb-2 border-r border-gray-500 border-dashed ">
								<div className="flex items-center mt-2">
									<UserIcon className="h-6 w-6 flex-shrink-0" />
									<Typography className='text-sl text-dark-500 ml-2'>{overviewService.author}</Typography>
								</div>
								<div className="flex items-center mt-2">
									<Square2StackIcon className="h-6 w-6 flex-shrink-0" />
									<Typography className='text-sl text-dark-500 ml-2'>{overviewService.status}</Typography>
								</div>
								<div className="flex items-center mt-2">
									<TagIcon className="h-6 w-6 flex-shrink-0" />
									<Typography className='text-sl text-dark-500 ml-2'>{overviewService.genre}</Typography>
								</div>
								<div className="flex items-center mt-2">
									<EyeIcon className="h-6 w-6 flex-shrink-0" />
									<Typography className='text-sl text-dark-500 ml-2'>{overviewService.totalViews}</Typography>
								</div>
								<div className="flex items-center mt-2">
									<ArrowPathIcon className="h-6 w-6 flex-shrink-0" />
									<Typography className='text-sl text-dark-500 ml-2'>{overviewService.updatedDate ? new Date(overviewService.updatedDate).toLocaleString() : 'null'}</Typography>
								</div>
							</div>

							<div className="col-span-3   ">
								<p className="text-sl">
									{overviewService.description}
								</p>
							</div>
						</div>
					</div>

					<div class="col-span-3  p-4 h-[550px]">
						<Typography
							className='text-[#2f52b2] text-lg font-semibold'
						>
							TRUYỆN ĐỀ CỬ
						</Typography>
						{
							randomBooksReconmend.map((book, i) => {
								const newEncodedUrl = btoa(book.url);
								return (
									<div className="items-center pt-2 pb-2 border-t border-gray-500 flex flex-row" >
										<img src={book.coverImage}
											alt="Image" className='w-[80px] h-[80px]' />
										<div className="flex flex-col ml-2">
											<Link to={`/story/${newEncodedUrl}`} className="hover:underline">
												<Typography className='text-sm'>
													<i>{book.title}</i>
												</Typography>
											</Link>
											<Typography className='text-[#2C7ABE] text-sm'>
												<i>{book.author}</i>
											</Typography>

										</div>
									</div>)
							})
						}
					</div>
				</div>
				<div ref={targetRef} className="grid grid-cols-12 gap-4 mb-10 ">

					<div className=" col-span-9  flex flex-col " >
						<Typography
							className='text-[#2f52b2] text-lg font-semibold pl-2'
						>
							CHƯƠNG MỚI NHẤT
						</Typography>
						{
							chapterInforByPage.map((chap, i) => {
								let temp = chap.url;
								console.log(temp);
								if (temp.endsWith('/')) {
									temp = temp.slice(0, -1);
								}
								temp = temp.substring(temp.lastIndexOf('/') + 1);
								const encodeChap = btoa(temp);
								return (
									<div className="border-t border-gray-500 pt-1 pb-1 hover:bg-gray-500" onClick={() => navigate(`/story/${encodedUrl}/${encodeChap}`)}>
										<Typography
											className='text-sm cursor-pointer '
										>
											{chap.title}
										</Typography>
									</div>
								)
							})

						}
						<CardFooter className='mx-auto -mt-4'>
							<Pagination pageLimit={overviewService.maxPageOfChapter} />
						</CardFooter>
					</div>
				</div>
			</div>
		</div >
	)
}
