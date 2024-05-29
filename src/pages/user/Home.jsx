import { Breadcrumb } from '../../components';
export const Home = ()=>{
	const breadcrumbItems = [];
	return (
		<div 
			className='mx-auto w-[1000px] mt-[20px]'
		>
			<Breadcrumb items={breadcrumbItems} />
		</div>
	)
}