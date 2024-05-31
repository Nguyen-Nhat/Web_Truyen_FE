import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../components';
import {useState,useEffect, useContext} from "react";
import {Cog8ToothIcon} from "@heroicons/react/24/outline";
import { ServerContext } from '../../context/ServerContext';
import {
    Typography,
    } from "@material-tailwind/react";
export const StoryDetail = ()=>{
	const {name, chap} = useParams();
	const breadcrumbItems = [
        { name: `${name}`, link: `/story/${name}` },
        { name: `${chap}`, link: `/story/${name}/${chap}` },
    ];


	const [author, date, content] = useState([]);
	const [servers, setServers] = useState([]);
	const { server, setServer} = useContext(ServerContext);
	const [chapter, setChapter] = useState('');
	const [chapters, setChapters] = useState([]);
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
	const handleChapterChange = ( e ) => {
		const newChapter = e.target.value;
        localStorage.setItem('chapter', newChapter);
        setServer(newChapter);
	};

	const handleServerChange = ( e ) => {
		const newServer = e.target.value;
        localStorage.setItem('server', newServer);
        setServer(newServer);
	};



	
	const [isHidden, setIsHidden] = useState(() => {
		const savedState = localStorage.getItem('isHidden');
		return savedState !== null ? JSON.parse(savedState) : false;
	  });
	const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 16);
	const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('fontFamily') || 'Arial');
	const [backgroundColor, setBackgroundColor] = useState(() => localStorage.getItem('backgroundColor') || 'white');
	const [fontColor, setFontColor] = useState(() => localStorage.getItem('fontColor') || 'black');
	const [lineHeight, setLineHeight] = useState(() => localStorage.getItem('lineHeight') || 1.5);
	const [text, setText] = useState('This is a sample text to demonstrate the story reader customization.');

	useEffect(() => {
		const setupServer = async () => {
			const data = await ServerService.getServers();
			setServers(data);
			const storedServer = localStorage.getItem('server');
			if(!storedServer || !data.includes(storedServer)){
				localStorage.setItem('server',data[0])
				setServer(data[0])
			}
			else {
				setServer(storedServer);
			}
		}
		setupServer();


		const setupChapter = async () => {
			const data = await ChapterService.getChapters();
			setChapters(data);
			const storedChapter = localStorage.getItem('server');
			if(!storedChapter || !data.includes(storedChapter)){
				localStorage.setItem('server',data[0])
				setChapter(data[0])
			}
			else {
				setChapter(storedChapter);
			}
		}
		setupChapter();

		localStorage.setItem('fontSize', fontSize);
		localStorage.setItem('fontFamily', fontFamily);
		localStorage.setItem('backgroundColor', backgroundColor);
		localStorage.setItem('fontColor', fontColor);
		localStorage.setItem('lineHeight', lineHeight);
		localStorage.setItem('isHidden', JSON.stringify(isHidden));

	},[ isHidden,fontSize, fontFamily, backgroundColor, fontColor, lineHeight, server, chapter])


	const handleFontSizeChange = (event) => {
		setFontSize(event.target.value);
	  };

	  const handleShowConfigDisplay = ( e ) => {
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


	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			
			<div
			className='w-full rounded-none  p-5' style={{backgroundColor}}
			>
				<div className='border-dotted border-2 border-black w-full rounded-lg p-2  h-full'
				>
					<Typography
						className='text-[red] text-3xl font-semibold  text-center m-1'
					>
						{name}
					</Typography>
					<Typography
						className='text-1xl font-semibold  text-center m-1'
					>
						{chap}
					</Typography>
					<Typography
						className='text-1xl  text-center m-1'
					>
						{author}
					</Typography>
					<Typography
						className='text-1xl  text-center m-1'
					>
						{date}
					</Typography>
				</div>
				<div className='w-full flex justify-center mt-5'>
					<div
						className="w-[70px] h-[30px] rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
					>
						&#60; Trước
					</div>

					<div className="w-[120px]  text-black m-1">
						<select 
							className="w-full h-[30px] focus:outline-none p-1 rounded border-solid border border-[black]"
							onChange={handleChapterChange}
							value={chapter}
						>
							{
								chapters.map((s, i) => (
									<option
										key={i}
										value={s}
									>
										{s}
									</option>
								))
							}
						</select>
					</div>


					<div className="w-[120px]  text-black m-1">
						<select 
							className="w-full h-[30px] focus:outline-none p-1 rounded border-solid border border-[black]"
							onChange={handleServerChange}
							value={server}
						>
							{
								servers.map((s, i) => (
									<option
										key={i}
										value={s}
									>
										{s}
									</option>
								))
							}
						</select>
					</div>

					<div
						className="w-[40px] h-[30px]  rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
							onClick={handleShowConfigDisplay}
					>
						<Cog8ToothIcon className=' w-6 h-6'/>
					</div>

					<div
						className="w-[70px] h-[30px] rounded-none bg-[#2779B0] flex items-center justify-center p-0 text-[white] hover:bg-[#66b4e8] cursor-default m-1"
					>
						Sau &#62;
					</div>

				</div>
				{!isHidden && (
									<div
									className=' w-full flex justify-center mt-5 ' style={{color: fontColor, fontFamily}} 
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
										
				
									</div>
									
								</div>
				)}


				<div className="preview mt-5 p-2" style={{ fontSize: `${fontSize}px`, fontFamily,  color: fontColor, lineHeight }}>
					{text}
				</div>	
			</div>
			
				
			
		</div>
	)
}