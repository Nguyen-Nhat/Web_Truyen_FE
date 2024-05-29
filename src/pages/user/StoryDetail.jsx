import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../components';
export const StoryDetail = ()=>{
	const {id, chap} = useParams();
	const breadcrumbItems = [
        { name: `name`, link: `/story/${id}` },
        { name: `chap`, link: `/story/${id}/${chap}` },
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