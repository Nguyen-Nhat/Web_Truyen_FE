import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import { useState, useEffect, useContext } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ServerContext } from '../../context/ServerContext';
import { ServerService } from "../../utils/ServerService";
import { StoryDetailService, BookService, ExportService } from '../../utils';
import { Spinner } from '@material-tailwind/react';
import {
	Typography,
} from "@material-tailwind/react";

export const StoryDetail = () => {

	const [historyReader, setHistoryReader] = useState(() => {
		const storedHistory = localStorage.getItem('historyReader');
		return storedHistory ? JSON.parse(storedHistory) : [];
	});
	const [check, setcheck] = useState('T');
	const [isSaveHistory, setSaveHistory] = useState('T');
	const [isLoading, setIsLoading] = useState(true);
	const { server, setServer } = useContext(ServerContext);
	const [formats, setFormats] = useState([]);
	const navigate = useNavigate();
	const { encodedUrl, chap } = useParams();
	let decodeUrl = decodeURIComponent(atob(encodedUrl));
	const decodeChap = decodeURIComponent(atob(chap));

	if (!(decodeUrl[decodeUrl.length - 1] === '/')) {
		decodeUrl += "/";
	}
	const url = useState(decodeUrl + decodeChap)[0];


	const [Chapter, setChapter] = useState({});

	const colors = [
		'black', 'white', 'lightgray', 'gray', 'red', 'green', 'blue', 'yellow',
		'magenta', 'cyan', 'pink', 'purple', 'orange', 'brown', 'darkblue', 'darkgreen',
		'darkred', 'darkgray', 'lightblue', 'lightgreen', 'lightcoral', 'gold', 'silver',
		'chocolate', 'crimson', 'indigo', 'lime', 'olive', 'teal', 'violet'
	];
	const fontFamilies = [
		'Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Times New Roman',
		'Georgia', 'Garamond', 'Courier New', 'Brush Script MT', 'Comic Sans MS'
	];



	const [isHidden, setIsHidden] = useState(() => {
		const savedState = localStorage.getItem('isHidden');
		return savedState !== null ? JSON.parse(savedState) : false;
	});


	const [format, setFormat] = useState(() => localStorage.getItem('format') || '');
	const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 16);
	const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('fontFamily') || 'Arial');
	const [backgroundColor, setBackgroundColor] = useState(() => localStorage.getItem('backgroundColor') || 'white');
	const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || 'black');
	const [lineHeight, setLineHeight] = useState(() => localStorage.getItem('lineHeight') || 1.5);
	let title = useState('');

	// Hàm xử lý thay đổi Chapter
	const handleChapterChange = (e) => {
		let temp = e.target.value;
		if (temp.endsWith('/')) {
			temp = temp.slice(0, -1);
		}
		temp = temp.substring(temp.lastIndexOf('/') + 1);
		const encodeChap = btoa(encodeURIComponent(temp));
		navigate(`/story/${encodedUrl}/${encodeChap}`);
		location.reload();
	}




	useEffect(() => {


		localStorage.setItem('format', format);
		localStorage.setItem('fontSize', fontSize);
		localStorage.setItem('fontFamily', fontFamily);
		localStorage.setItem('backgroundColor', backgroundColor);
		localStorage.setItem('fontColor', fontColor);
		localStorage.setItem('lineHeight', lineHeight);
		localStorage.setItem('isHidden', JSON.stringify(isHidden));


	}, [isHidden, fontSize, fontFamily, backgroundColor, fontColor, lineHeight]);

	useEffect(() => {
		const getFormats = async () => {
			const data = await ExportService.getFormats();
			if (data) setFormats(data);
		}
		getFormats();

		const getChapter = async () => {
			const data = await StoryDetailService.getChapter(url);
			if (data) {
				//setcheck('T');
				setChapter(data);
			}
			//else
			//setcheck('F');
		};
		getChapter();
		setIsLoading(true);
		Promise.all([getChapter(), getFormats()]).then(() => setIsLoading(false));
	}, [format]);

	useEffect(() => {
		const getUrlNewServer = async () => {
			if (Chapter && Object.keys(overviewService).length > 0) {
				const title = chuyenDoiKhongDau(overviewService.title.includes(' - ') ? overviewService.title.split(' - ')[0] : overviewService.title);
				const data = await BookService.searchByName(title, 1);
				if (data && data.length > 0) {
					window.location.href = `/story/${btoa(encodeURIComponent(data[0].url))}`;
				}
				else {
					setcheck('F');
				}
			}
		}
		//getUrlNewServer();

		//Promise.all([getUrlNewServer()]).then(() => setIsLoading(false));

		if (historyReader) {
			try {
				historyReader = JSON.parse(historyReader);
			} catch (e) {
				console.error('Error parsing jsonArrayFromStorage', e);
			}
		}
		else {
			historyReader = [];
		}

		if (Chapter != null && Chapter.title != null && isSaveHistory == 'T') {
			let updatedHistory = [];
			if (Array.isArray(historyReader)) {
				updatedHistory = historyReader.filter(item => item.title !== Chapter.title);
			}
			updatedHistory = [...updatedHistory, { title: Chapter.title, url: url, server: server, chapterNumber: Chapter.currentChapter.chapterNumber }];
			setHistoryReader(updatedHistory);
			console.log(updatedHistory);
			setSaveHistory('F');
			localStorage.setItem('historyReader', JSON.stringify(updatedHistory));
		}
	}, [historyReader, isSaveHistory, Chapter]);

	const currentChapter = (Chapter.currentChapter != null) ? Chapter.currentChapter : false;
	const chapters = (Chapter.chapters != null) ? Chapter.chapters : false;
	if (Chapter.currentChapter != null) {
		title = Chapter.currentChapter.title;
	}
	else if (chapters != null) {
		for (let i = 0; i < chapters.length; i++) {
			if (chapters[i].url === Chapter.url)
				title = chapters[i].title;
		}
	}
	const breadcrumbItems = [
		{ name: `${Chapter.title}`, link: `/story/${encodedUrl}` },
		{ name: `${title}` },
	];



	let index = 0;
	if (Chapter.currentChapter != null) {
		index = Chapter.currentChapter.chapterNumber - 1;
	}


	function handleChangePrevious() {
		if (Chapter.currentChapter != null) {
			if (Chapter.currentChapter.chapterNumber > 1 && chapters) {
				let temp = chapters[Chapter.currentChapter.chapterNumber - 2].url;
				if (temp.endsWith('/')) {
					temp = temp.slice(0, -1);
				}
				temp = temp.substring(temp.lastIndexOf('/') + 1);
				const encodeChap = btoa(encodeURIComponent(temp));
				navigate(`/story/${encodedUrl}/${encodeChap}`);
				location.reload();
			}
		}
	}

	function handleChangeNext() {
		if (Chapter.currentChapter != null) {
			if (chapters && Chapter.currentChapter.chapterNumber < chapters.length + 1) {
				let temp = chapters[Chapter.currentChapter.chapterNumber].url;
				if (temp.endsWith('/')) {
					temp = temp.slice(0, -1);
				}
				temp = temp.substring(temp.lastIndexOf('/') + 1);
				const encodeChap = btoa(encodeURIComponent(temp));
				navigate(`/story/${encodedUrl}/${encodeChap}`);
				location.reload();
			}
		}
	}


	const handleFormatChange = (event) => {
		setFormat(event.target.value);
	};


	const handleFontSizeChange = (event) => {
		setFontSize(event.target.value);
	};

	const handleShowConfigDisplay = (e) => {
		setIsHidden(!isHidden);
	};


	const handleFontFamilyChange = (event) => {
		setFontFamily(event.target.value);
	};

	const handleBackgroundColorChange = (event) => {
		setBackgroundColor(event.target.value);
	};

	const handleFontColorChange = (event) => {
		setFontColor(event.target.value);
	};

	const handleLineHeightChange = (event) => {
		setLineHeight(event.target.value);
	};

	const handleExport = () => {
		if (Chapter && Chapter.hasOwnProperty('content'))
			ExportService.postExport(format, Chapter.content);
	};

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
					check == 'F' ? (
						<div className=" font-bold text-center col-span-9 p-4  flex flex-col" >
							Không tồn tại truyện tại server này !
						</div>)

						: Chapter && Object.keys(Chapter).length > 0 && (
							<div
								className='w-full rounded-none  p-5' style={{ backgroundColor }}
							>

								<div className="border-dotted border-2 border-black w-full rounded-lg p-2  h-full">
									<Typography className="text-[red] text-3xl font-semibold  text-center m-1">
										<span>{Chapter.title}</span>
									</Typography>
									{currentChapter && (
										<Typography className="text-1xl font-semibold  text-center m-1" style={{ color: fontColor }}>
											<span>{title}</span>
										</Typography>
									)}

									<Typography className="text-1xl  text-center m-1" style={{ color: fontColor }}>
										<span>{Chapter.author}</span>
									</Typography>
									<Typography className="text-1xl  text-center m-1" style={{ color: fontColor }}>
										<span>{Chapter.date ? new Date(Chapter.date).toLocaleString() : ''}</span>
									</Typography>
								</div>



								<div className='w-full flex justify-center mt-5'>
									<div
										className="w-[70px] h-[30px] rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
										onClick={handleChangePrevious}
									>
										&#60; Trước
									</div>

									{chapters && (

										<div className="w-[200px]  text-black m-1">
											<select
												className="w-full h-[30px] focus:outline-none p-1 rounded border-solid border border-[black]"
												onChange={handleChapterChange}

											>
												{
													chapters.map((chap, i) => {
														if (i === index) {
															return (
																<option className=' text-center' selected key={i} value={chap.url}>{chap.title}</option>
															)
														}
														else {
															return (
																<option className=' text-center' key={i} value={chap.url}>{chap.title}</option>
															)
														}

													})
												}
											</select>

										</div>
									)}






									<div
										className="w-[40px] h-[30px]  rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
										onClick={handleShowConfigDisplay}
									>
										<Cog8ToothIcon className=' w-6 h-6' />
									</div>

									<div
										className="w-[70px] h-[30px] rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
										onClick={handleChangeNext}
									>
										Sau &#62;
									</div>

								</div>
								{!isHidden && (
									<div
										className=' w-full flex justify-center mt-5 ' style={{ color: fontColor, fontFamily }}
									>
										<div
											className=' w-6/12 rounded-none border-dotted border border-[black] '
										>
											<div className='border-b border-dotted  border-[black] pt-3 pb-1 p-2 '>
												<label className='flex justify-between'>
													Kích cỡ chữ:
													<select value={fontSize} onChange={handleFontSizeChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60].map(size => (
															<option key={size} value={size}>{size}</option>
														))}
													</select>
												</label>
											</div>
											<div className='border-b border-dotted  border-[black] pt-1 pb-1 p-2 '>
												<label className='flex justify-between'>
													Kiểu chữ:
													<select value={fontFamily} onChange={handleFontFamilyChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{fontFamilies.map(font => (
															<option key={font} value={font}>{font}</option>
														))}
													</select>
												</label>
											</div>
											<div className='border-b border-dotted  border-[black] pt-1 pb-1 p-2 '>
												<label className='flex justify-between'>
													Màu nền:
													<select value={backgroundColor} onChange={handleBackgroundColorChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{colors.map(color => (
															<option key={color} value={color} style={{ backgroundColor: color }}>{color}</option>
														))}
													</select>
												</label>
											</div>
											<div className='border-b border-dotted  border-[black] pt-1 pb-1 p-2 '>
												<label className='flex justify-between'>
													Màu chữ:
													<select value={fontColor} onChange={handleFontColorChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{colors.map(color => (
															<option key={color} value={color} style={{ color: color }}>{color}</option>
														))}
													</select>
												</label>
											</div>
											<div className='border-b border-dotted  border-[black] pt-1 pb-1 p-2 mb-2'>
												<label className='flex justify-between'>
													Chiều cao dòng:
													<select value={lineHeight} onChange={handleLineHeightChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{[0.5, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 2.25, 4.5, 4.75, 5].map(height => (
															<option key={height} value={height}>{height}</option>
														))}
													</select>
												</label>
											</div>
											<div className=' pt-0 pb-1 p-2 mb-2'>
												<label className='flex justify-between'>
													Định dạng file:
													<select value={format} onChange={handleFormatChange} className='w-[280px] rounded border-solid border border-[black] text-black'>
														{formats.map(format => (
															<option key={format} value={format}>{format}</option>
														))}
													</select>
												</label>

											</div>

											<div className='flex justify-center'>
												<div
													className="w-[100px] h-[33px]  rounded bg-[#2779B0] text-center  text-[white] hover:bg-[#66b4e8] cursor-default mb-2 mt-0 m-1 p-1"
													onClick={handleExport}
												>
													Xuất file
												</div>
											</div>



										</div>

									</div>
								)}


								<div className="preview mt-5 p-2" style={{ fontSize: `${fontSize}px`, fontFamily, color: fontColor, lineHeight }}
									dangerouslySetInnerHTML={{ __html: Chapter.content }}
								>

								</div>

							</div>

						)
				)}

		</div>

	)
}