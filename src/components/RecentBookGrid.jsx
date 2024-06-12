import { Link } from 'react-router-dom';
import { ServerContext } from "../context/ServerContext";
import { useContext } from 'react';
import {
    Typography,
} from "@material-tailwind/react"
export function RecentBookGrid({ title, books }) {
    const { server, setServer } = useContext(ServerContext);
    const handleServer = (event, server) => {
        localStorage.setItem('server', server)
        setServer(server);
    };
    return (
        <div
            className='max-w-full h-fit w-[680px] bg-white mb-[50px]'
        >
            <div className='border px-[10px] py-[8px] '>
                <Typography
                    className='text-[#2f52b2] text-lg font-semibold'
                >
                    {title}
                </Typography>
            </div>
            {
                books === null ? (
                    <Typography className='text-black text-center'>Không tìm thấy</Typography>
                ) : (
                    books.map((book, i) => {
                        const encodedUrlStory = btoa(encodeURIComponent(book.urlStory));
                        const encodedUrlChap = btoa(encodeURIComponent(book.urlChap));
                        return (
                            <div className='flex items-center h-[74px] border-b my-1' key={i}>
                                <div className='ml-4'>
                                    <Link to={`/story/${encodedUrlStory}`} className='hover:underline' onClick={(event) => handleServer(event, book.server)}>
                                        <Typography className='text-base'>{book.title}</Typography>
                                    </Link>
                                </div>
                                <div className='ml-auto w-[150px] flex-shrink-0'>
                                    <Typography className='text-base'>Chương {book.chapterNumber}</Typography>
                                    <Link to={`/story/${encodedUrlStory}/${encodedUrlChap}`} className='hover:underline' onClick={(event) => handleServer(event, book.server)}>
                                        <Typography className='text-sm text-gray-500'>
                                            Đọc tiếp
                                        </Typography>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    );
}
