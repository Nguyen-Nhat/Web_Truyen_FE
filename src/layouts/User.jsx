import { Routes, Route } from "react-router-dom"
import {Header} from "../components/layout"
import {Home, Search, StoryOverview,StoryDetail, Genre} from '../pages/user'
import { NotFound } from "../pages/NotFound"
export function User(){
	return (
		<div>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/genre/:slug" element={<Genre/>}/>
				<Route path="/story/:encodedUrl" element={<StoryOverview/>}/>
				<Route path="/story/:encodedUrl/:chap" element={<StoryDetail/>}/>
				<Route path="/search" element={<Search/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</div>
	)
};