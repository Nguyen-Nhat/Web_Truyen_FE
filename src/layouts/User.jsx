import { Routes, Route } from "react-router-dom"
import {Header} from "../components/layout"
import {Home, Search, StoryOverview,StoryDetail} from '../pages/user'
import { NotFound } from "../pages/NotFound"
export function User(){
	return (
		<div>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/story/:id" element={<StoryOverview/>}/>
				<Route path="/story/:id/:chap" element={<StoryDetail/>}/>
				<Route path="/search" element={<Search/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</div>
	)
};