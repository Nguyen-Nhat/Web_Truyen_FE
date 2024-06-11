import { useParams, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import {
	Typography, CardFooter
} from "@material-tailwind/react"
import { StarIcon, UserIcon, TagIcon, EyeIcon, ArrowPathIcon, Square2StackIcon } from "@heroicons/react/24/solid";
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
	const [check, setcheck] = useState('T');
	const decodeUrl = decodeURIComponent(atob(encodedUrl));
	const { server } = useContext(ServerContext);

	const [chapterInforByPage, setChapterInfor] = useState([]);
	const [booksReconmend, setBooks] = useState([]);
	const [chapterInforByPage1, setChapterInfor1] = useState([]);



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
		const getChapterInfor1 = async () => {
			const data = await OverviewService.ChapterInforByPage(decodeUrl, page);
			if (data) setChapterInfor1(data);
		}
		getRecommendation();
		getOverviewParams()
		getChapterInfor();
		getChapterInfor1();

	}, []);

	useEffect(() => {
		const getUrlNewServer = async () => {
			if (overviewService && Object.keys(overviewService).length > 0) {
				const title = chuyenDoiKhongDau(overviewService.title.includes(' - ') ? overviewService.title.split(' - ')[0] : overviewService.title);
				const data = await BookService.searchByName(title, 1);
				if (data && data.length > 0) {
					window.location.href = `/story/${btoa(data[0].url)}`;
				}
				else {
					setcheck('F');
				}
			}
		}
		getUrlNewServer();

	}, [server]);
	useEffect(() => {
		const getChapterInfor = async () => {
			const data = await OverviewService.ChapterInforByPage(decodeUrl, page);
			if (data) setChapterInfor(data);
		}
		getChapterInfor();
	}, [page]);

	let temp1;
	if (chapterInforByPage1 && chapterInforByPage1.length > 0) {
		temp1 = chapterInforByPage1[0].url;
		if (temp1.endsWith('/')) {
			temp1 = temp1.slice(0, -1);
		}
		temp1 = temp1.substring(temp1.lastIndexOf('/') + 1);
	}
	const encodeChap1 = btoa(temp1);

	const randomBooksReconmend = booksReconmend.slice(0, 5);


	const breadcrumbItems = [
		{ name: `${overviewService.title}`, link: `/story/${encodedUrl}` },
	];
	const navigate = useNavigate();

	const targetRef = useRef(null);

	const scrollToTarget = () => {
		targetRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	function chuyenDoiKhongDau(chuoi) {
		return chuoi
			.normalize("NFD") // Chuẩn hóa ký tự Unicode
			.replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
			.replace(/đ/g, 'd') // Thay thế ký tự đặc biệt "đ"
			.replace(/Đ/g, 'D') // Thay thế ký tự đặc biệt "Đ"
			.toLowerCase() // Chuyển thành chữ thường
			.replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch nối
	}
	let slug = overviewService.genre;
	if (slug) {
		let cacTu = slug.split(", ");
		slug = chuyenDoiKhongDau(cacTu[0]);
	}
	return (
		<div
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			{check == 'F' ? (
				<div className=" font-bold text-center col-span-9 p-4  flex flex-col" >
					Không tồn tại truyện tại server này !
				</div>)
				: (overviewService && Object.keys(overviewService).length > 0 &&
					<div className="mx-auto container ">
						<div className="grid grid-cols-12 gap-4 ">

							< div className=" col-span-9 p-4  flex flex-col" >
								<div className="grid grid-cols-4 gap-4  border-b border-gray-500 border-dashed">
									<div className="col-span-1  rounded-md mb-2">
										<img src={overviewService.coverImage}
											alt="Title" className='w-[180px] h-[180px]' />
									</div>
									<div className="col-span-3  ">
										<Typography className='text-2xl text-red-500 text-center'>{overviewService.title ? overviewService.title.toUpperCase() : "null"}
										</Typography>
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
											<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2 hover:bg-gray-500" onClick={() => navigate(`/genre/${slug}`)}>
												Truyện cùng loại
											</button>
										</div>

										<div className="flex justify-center mt-2">

											<button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-500" onClick={() => navigate(`/story/${encodedUrl}/${encodeChap1}`)}>
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
											<Typography className='text-sl text-dark-500 ml-2'>{overviewService.totalViews === 0 ? "null" : overviewService.totalViews} </Typography>
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

							<div className="col-span-3  p-4 h-[550px]">
								<Typography
									className='text-[#2f52b2] text-lg font-semibold'
								>
									TRUYỆN ĐỀ CỬ
								</Typography>
								{
									randomBooksReconmend.map((book, i) => {
										const newEncodedUrl = btoa(book.url);
										return (
											<div key={i} className="items-center pt-2 pb-2 border-t border-gray-500 flex flex-row" >
												<img src={book.coverImage}
													alt="Image" className='w-20 h-20 flex-shrink-0' />
												<div className="flex flex-col ml-2">
													<Link to={`/story/${newEncodedUrl}`} className="hover:underline">
														<Typography className='text-sm' onClick={() => window.location.href = `/story/${newEncodedUrl}`}>
															<i>{book.title ? book.title : "null"}</i>
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
										if (temp.endsWith('/')) {
											temp = temp.slice(0, -1);
										}
										temp = temp.substring(temp.lastIndexOf('/') + 1);
										const encodeChap = btoa(temp);
										return (
											<div key={i} className="border-t border-gray-500 pt-1 pb-1 hover:bg-gray-500" onClick={() => navigate(`/story/${encodedUrl}/${encodeChap}`)}>
												<Typography
													className='text-sm cursor-pointer '
												>
													{chap.title ? chap.title : "null"}
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
				)}
		</div >
	)
}
