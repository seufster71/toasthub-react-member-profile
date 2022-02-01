/*
 * Copyright (C) 2016 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use-strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as profileActions from '../../member/profile/profile-actions';
import fuLogger from '../../core/common/fu-logger';
import ProfileView from '../../memberView/profile/profile-view';
import ProfileModifyView from '../../memberView/profile/profile-modify-view';
import BaseContainer from '../../core/container/base-container';

function ProfileContainer() {
	const session = useSelector((state) => state.session);
	const appMenus = useSelector((state) => state.appMenus);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		dispatch(teamActions.init({lang:session.selected.lang}));
	}, []);

	const getState = () => {
		return session;
	}
	
	const getForm = () => {
		return "MEMBER_PROFILE_FORM";
	}
	
	const onOption = (code,item) => {
		fuLogger.log({level:'TRACE',loc:'ProfileContainer::onOption',msg:" code "+code});
		if (BaseContainer.onOptionBase(code,item)) {
			return;
		}
	}
	
	fuLogger.log({level:'TRACE',loc:'ProfileContainer::render',msg:"Hi there"});
	if (session.selected != null) {
		return (
			<ProfileModifyView
			itemState={session}
			appPrefs={appPrefs}
			onSave={BaseContainer.onSave}
			onCancel={BaseContainer.onCancel}
			inputChange={BaseContainer.inputChange}
			/>
		);
	} else if (member.item != null) {
		return (
			<ProfileView
			itemState={session}
			appPrefs={appPrefs}
			onListLimitChange={BaseContainer.onListLimitChange}
			onSearchChange={BaseContainer.onSearchChange}
			onSearchClick={BaseContainer.onSearchClick}
			onPaginationClick={BaseContainer.onPaginationClick}
			onOrderBy={BaseContainer.onOrderBy}
			closeModal={BaseContainer.closeModal}
			onOption={onOption}
			inputChange={BaseContainer.inputChange}
			session={session}
			/>
		);
	} else {
		return (<div> Loading... </div>);
	}
}

export default ProfileContainer;
