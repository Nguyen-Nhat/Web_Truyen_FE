import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../components';
export const StoryOverview = ()=>{
	const {encodedUrl} = useParams();
	const breadcrumbItems = [
		// mã hóa rồi lấy tên hay gì gán vô 
        // { name: `${name}`, link: `/story/${name}` },
    ];
	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
			
			1 trong 2 người chọn này r làm tiếp
		</div>
	)
}