import {useState,useEffect} from "react";
import {
    Navbar,
    Typography,
    Button,
    } from "@material-tailwind/react";
import {BookOpenIcon,MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useNavigate,Link} from "react-router-dom";
import { ServerService } from "../../utils/ServerService";
export function Header(){
	const navigate = useNavigate();
	const [searchString, setSearchString] = useState('');
	const [servers, setServers] = useState([]);
	const [server, setServer] = useState('');
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
	},[])
	
	const handleSearch = ( e ) => {
		if (searchString.trim() !== '') {
			navigate(`/search?q=${searchString}`);
			setSearchString('');
		}
	};
	const handleServerChange = ( e ) => {
		const newServer = e.target.value;
        localStorage.setItem('server', newServer);
        setServer(newServer);
	};
	const handleOnKeyDown = (e) => {
		if(e.key === 'Enter'){
			handleSearch(e);
		}
	}
	return (
		<Navbar className="flex items-center justify-center sticky top-0 z-10 bg-[#2C7ABE] bg-opacity-100 h-[50px] max-w-full rounded-none border-none">
            <div className="flex items-center justify-between w-[1000px]">
                <Link to="/">
					<div className="flex items-center">
						<BookOpenIcon className="h-8 w-8 text-white"/>
						<Typography
							as="h5"
							className="ml-2 cursor-pointer text-2xl font-normal text-white tracking-wider grow"
						>
							TRUYỆN HAY
						</Typography>
					</div>
                </Link>
                <div className="flex items-center">
					<div className="w-[120px] mr-1 text-black">
						<select 
							className="w-full h-[34px] focus:outline-none"
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
					<input
						type="text"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						placeholder="Tìm truyện"
						onKeyDown={handleOnKeyDown}
						className="w-[300px] h-[34px] px-2 py-1 text-sm text-gray-600 border-none rounded-none focus focus:outline-none  mr-1"
					/>
					<Button
						className="w-[42px] h-[34px] rounded-none border-none bg-[#E5E6E9] flex items-center justify-center p-0"
						onClick={handleSearch}
					>
						<MagnifyingGlassIcon className="h-5 w-5 text-black"/>
					</Button>
				</div>
            </div>
        </Navbar>
	);
}