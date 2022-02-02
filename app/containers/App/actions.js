/*
 *
 * App actions
 *
 */

import {
  ACCEPT_COMMENT,
  ACCEPT_COMMENT_FAIL,
  ACCEPT_COMMENT_SUCCESS,
  ADD_CATEGORY,
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_PLAYLIST,
  ADD_PLAYLIST_FAIL,
  ADD_PLAYLIST_SUCCESS,
  ADD_TAG,
  ADD_TAG_FAIL,
  ADD_TAG_SUCCESS,
  BANNER_UPLOAD,
  BANNER_UPLOAD_FAIL,
  BANNER_UPLOAD_SUCCESS,
  CHANNEL_BANNER_UPLOAD,
  CHANNEL_BANNER_UPLOAD_FAIL,
  CHANNEL_BANNER_UPLOAD_SUCCESS,
  CREATE_VIDEO,
  CREATE_VIDEO_CLEAR,
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_VIDEO,
  DELETE_VIDEO_CLEAR_ERROR_ACTION,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_SUCCESS,
  DRAWER_OPEN,
  EDIT_CATEGORY,
  EDIT_CATEGORY_FAIL,
  EDIT_CATEGORY_SUCCESS,
  ERROR_CLEAR,
  ERROR_HAPPEN,
  FILE_UPLOAD,
  FILE_UPLOAD_FAIL,
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_SUCCESS,
  FOLLOW_CHANNEL,
  FOLLOW_CHANNEL_FAIL,
  FOLLOW_CHANNEL_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIZED_VIDEOS,
  GET_CATEGORIZED_VIDEOS_FAIL,
  GET_CATEGORIZED_VIDEOS_SUCCESS,
  GET_CHANNEL_INFO,
  GET_CHANNEL_INFO_CLEAR,
  GET_CHANNEL_INFO_FAIL,
  GET_CHANNEL_INFO_SUCCESS,
  GET_CHANNEL_STATISTICS,
  GET_CHANNEL_STATISTICS_CLEAR,
  GET_CHANNEL_STATISTICS_FAIL,
  GET_CHANNEL_STATISTICS_SUCCESS,
  GET_COMMENT_LIST,
  GET_COMMENT_LIST_FAIL,
  GET_COMMENT_LIST_SUCCESS,
  GET_FOLLOWING_LIST,
  GET_FOLLOWING_LIST_FAIL,
  GET_FOLLOWING_LIST_SUCCESS,
  GET_MY_CATEGORIES,
  GET_MY_CATEGORIES_FAIL,
  GET_MY_CATEGORIES_SUCCESS,
  GET_PLAYLIST,
  GET_PLAYLISTS,
  GET_PLAYLISTS_FAIL,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLIST_FAIL,
  GET_PLAYLIST_SUCCESS,
  GET_TAGS,
  GET_TAGS_FAIL,
  GET_TAGS_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_ME,
  GET_USER_ME_FAIL,
  GET_USER_ME_SUCCESS,
  GET_VIDEO,
  GET_VIDEOS,
  GET_VIDEOS_FAIL,
  GET_VIDEOS_SUCCESS,
  GET_VIDEO_CLEAR,
  GET_VIDEO_FAIL,
  GET_VIDEO_STATISTICS,
  GET_VIDEO_STATISTICS_FAIL,
  GET_VIDEO_STATISTICS_SUCCESS,
  GET_VIDEO_SUCCESS,
  CHANGE_VIDEO_STATE,
  CHANGE_VIDEO_STATE_SUCCESS,
  CHANGE_VIDEO_STATE_FAIL,
  CHANGE_VIDEO_STATE_CLEAR,
  LIKE_OR_DISLIKE_VIDEO,
  LIKE_OR_DISLIKE_VIDEO_CLEAR,
  LIKE_OR_DISLIKE_VIDEO_FAIL,
  LIKE_OR_DISLIKE_VIDEO_SUCCESS,
  LIST_MY_VIDEOS,
  LIST_MY_VIDEOS_FAIL,
  LIST_MY_VIDEOS_SUCCESS,
  LOGOUT_ACTION,
  LOGOUT_ACTION_FAIL,
  LOGOUT_ACTION_SUCCESS,
  NOTIFICATION_HIDE,
  NOTIFICATION_SHOW,
  POST_COMMENT,
  POST_COMMENT_FAIL,
  POST_COMMENT_SUCCESS,
  REMOVE_COMMENT,
  REMOVE_COMMENT_FAIL,
  REMOVE_COMMENT_SUCCESS,
  REPUBLISH_VIDEO,
  REPUBLISH_VIDEO_CLEAR,
  REPUBLISH_VIDEO_FAIL,
  REPUBLISH_VIDEO_SUCCESS,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_FAIL,
  RESET_USER_PASSWORD_SUCCESS,
  UNFOLLOW_CHANNEL,
  UNFOLLOW_CHANNEL_FAIL,
  UNFOLLOW_CHANNEL_SUCCESS,
  UNREGISTER_USER,
  UNREGISTER_USER_FAIL,
  UPDATE_CHANNEL_INFO,
  UPDATE_CHANNEL_INFO_FAIL,
  UPDATE_CHANNEL_INFO_SUCCESS,
  UPDATE_CHANNEL_SOCIALS,
  UPDATE_CHANNEL_SOCIALS_FAIL,
  UPDATE_CHANNEL_SOCIALS_SUCCESS,
  UPDATE_CHANNEL_USERINFO,
  UPDATE_CHANNEL_USERINFO_CLEAR,
  UPDATE_CHANNEL_USERINFO_CONFIRM,
  UPDATE_CHANNEL_USERINFO_CONFIRM_FAIL,
  UPDATE_CHANNEL_USERINFO_CONFIRM_SUCCESS,
  UPDATE_CHANNEL_USERINFO_FAIL,
  UPDATE_CHANNEL_USERINFO_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_VIDEO,
  UPDATE_VIDEO_CLEAR,
  UPDATE_VIDEO_FAIL,
  UPDATE_VIDEO_SUCCESS,
} from './constants';

// #region global
export function errorHappenAction(error) {
  return {
    type: ERROR_HAPPEN,
    error,
  };
}
export function errorClearAction() {
  return {
    type: ERROR_CLEAR,
  };
}
export function drawerToggleAction(show) {
  return {
    type: DRAWER_OPEN,
    show,
  };
}
// #endregion global

// #region notification
export function notificationShowAction(title, type) {
  return {
    type: NOTIFICATION_SHOW,
    data: { title, type },
  };
}

export function notificationHideAction() {
  return {
    type: NOTIFICATION_HIDE,
  };
}
// #endregion notification

// #region fileUpload
export function fileUploadAction(file) {
  return {
    type: FILE_UPLOAD,
    file,
  };
}
export function fileUploadProgressAction(percent) {
  return {
    type: FILE_UPLOAD_PROGRESS,
    percent,
  };
}
export function fileUploadSuccessAction(data) {
  return {
    type: FILE_UPLOAD_SUCCESS,
    data,
  };
}
export function fileUploadFailAction(error) {
  return {
    type: FILE_UPLOAD_FAIL,
    error,
  };
}
// #endregion fileUpload

// #region createVideo
export function createVideoAction(params) {
  return {
    type: CREATE_VIDEO,
    params,
  };
}
export function createVideoSuccessAction(data) {
  return {
    type: CREATE_VIDEO_SUCCESS,
    data,
  };
}
export function createVideoFailAction(error) {
  return {
    type: CREATE_VIDEO_FAIL,
    error,
  };
}
export function createVideoClearAction() {
  return {
    type: CREATE_VIDEO_CLEAR,
  };
}
// #endregion createVideo

// #region updateVideo
export function updateVideoAction(slug, params) {
  return {
    type: UPDATE_VIDEO,
    slug,
    params,
  };
}
export function updateVideoSuccessAction(data) {
  return {
    type: UPDATE_VIDEO_SUCCESS,
    data,
  };
}
export function updateVideoFailAction(error) {
  return {
    type: UPDATE_VIDEO_FAIL,
    error,
  };
}
export function updateVideoClearAction() {
  return {
    type: UPDATE_VIDEO_CLEAR,
  };
}
// #endregion updateVideo

// #region deleteVideo
export function deleteVideoAction(slug) {
  return {
    type: DELETE_VIDEO,
    slug,
  };
}
export function deleteVideoSuccessAction() {
  return {
    type: DELETE_VIDEO_SUCCESS,
  };
}
export function deleteVideoFailAction(error) {
  return {
    type: DELETE_VIDEO_FAIL,
    error,
  };
}
export function deleteVideoErrorClearAction() {
  return {
    type: DELETE_VIDEO_CLEAR_ERROR_ACTION,
  };
}
// #endregion deleteVideo

// #region getVideo
export function getVideoAction(slug) {
  return {
    type: GET_VIDEO,
    slug,
  };
}
export function getVideoSuccessAction(data) {
  return {
    type: GET_VIDEO_SUCCESS,
    data,
  };
}
export function getVideoFailAction(error) {
  return {
    type: GET_VIDEO_FAIL,
    error,
  };
}
export function getVideoClearAction() {
  return {
    type: GET_VIDEO_CLEAR,
  };
}
// #endregion getVideo

// #region getVideos
export function getVideosAction(params) {
  return {
    type: GET_VIDEOS,
    params,
  };
}
export function getVideosSuccessAction(data) {
  return {
    type: GET_VIDEOS_SUCCESS,
    data,
  };
}
export function getVideosFailAction(error) {
  return {
    type: GET_VIDEOS_FAIL,
    error,
  };
}
// #endregion getVideos

// #region getVideoStatistics
export function getVideoStatisticsAction(slug, range) {
  return {
    type: GET_VIDEO_STATISTICS,
    slug,
    range,
  };
}
export function getVideoStatisticsSuccessAction(data) {
  return {
    type: GET_VIDEO_STATISTICS_SUCCESS,
    data,
  };
}
export function getVideoStatisticsFailAction(error) {
  return {
    type: GET_VIDEO_STATISTICS_FAIL,
    error,
  };
}
// #endregion getVideoStatistics

// #region getMyVideos
export function getMyVideosAction(params) {
  return {
    type: LIST_MY_VIDEOS,
    params,
  };
}
export function getMyVideosSuccessAction(data) {
  return {
    type: LIST_MY_VIDEOS_SUCCESS,
    data,
  };
}
export function getMyVideosFailAction(error) {
  return {
    type: LIST_MY_VIDEOS_FAIL,
    error,
  };
}
// #endregion getMyVideos

// #region like video
export function likeOrDislikeAction(slug, like) {
  return {
    type: LIKE_OR_DISLIKE_VIDEO,
    slug,
    like,
  };
}
export function likeOrDislikeSuccessAction() {
  return {
    type: LIKE_OR_DISLIKE_VIDEO_SUCCESS,
  };
}
export function likeOrDislikeFailAction(error) {
  return {
    type: LIKE_OR_DISLIKE_VIDEO_FAIL,
    error,
  };
}
export function likeOrDislikeClearAction() {
  return {
    type: LIKE_OR_DISLIKE_VIDEO_CLEAR,
  };
}
// #endregion like video

// #region republish video
export function republishVideoAction(slug) {
  return {
    type: REPUBLISH_VIDEO,
    slug,
  };
}
export function republishVideoSuccessAction() {
  return {
    type: REPUBLISH_VIDEO_SUCCESS,
  };
}
export function republishVideoFailAction(error) {
  return {
    type: REPUBLISH_VIDEO_FAIL,
    error,
  };
}
export function republishVideoClearAction() {
  return {
    type: REPUBLISH_VIDEO_CLEAR,
  };
}
// #endregion republish video

// #region change video state
export function changeVideoStateAction(params) {
  return {
    type: CHANGE_VIDEO_STATE,
    params,
  };
}
export function changeVideoStateSuccessAction(data) {
  return {
    type: CHANGE_VIDEO_STATE_SUCCESS,
    data,
  };
}
export function changeVideoStateFailAction(error) {
  return {
    type: CHANGE_VIDEO_STATE_FAIL,
    error,
  };
}
export function changeVideoStateClearAction() {
  return {
    type: CHANGE_VIDEO_STATE_CLEAR,
  };
}
// #endregion change video state

// #region getTags
export function getTagsAction() {
  return {
    type: GET_TAGS,
  };
}
export function getTagsSuccessAction(data) {
  return {
    type: GET_TAGS_SUCCESS,
    data,
  };
}
export function getTagsFailAction(error) {
  return {
    type: GET_TAGS_FAIL,
    error,
  };
}
// #endregion getTags

// #region addTag
export function addTagAction(tag) {
  return {
    type: ADD_TAG,
    tag,
  };
}
export function addTagSuccessAction(data) {
  return {
    type: ADD_TAG_SUCCESS,
    data,
  };
}
export function addTagFailAction(error) {
  return {
    type: ADD_TAG_FAIL,
    error,
  };
}
// #endregion addTag

// #region getCategories
export function getCategoriesAction() {
  return {
    type: GET_CATEGORIES,
  };
}
export function getCategoriesSuccessAction(data) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    data,
  };
}
export function getCategoriesFailAction(error) {
  return {
    type: GET_CATEGORIES_FAIL,
    error,
  };
}
// #endregion getCategories

// #region getMyCategories
export function getMyCategoriesAction(withVideoCount) {
  return {
    type: GET_MY_CATEGORIES,
    withVideoCount: +!!withVideoCount,
  };
}
export function getMyCategoriesSuccessAction(data) {
  return {
    type: GET_MY_CATEGORIES_SUCCESS,
    data,
  };
}
export function getMyCategoriesFailAction(error) {
  return {
    type: GET_MY_CATEGORIES_FAIL,
    error,
  };
}
// #endregion getMyCategories

// #region addCategory
export function addCategoryAction(title) {
  return {
    type: ADD_CATEGORY,
    title,
  };
}
export function addCategorySuccessAction(data) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data,
  };
}
export function addCategoryFailAction(error) {
  return {
    type: ADD_CATEGORY_FAIL,
    error,
  };
}
// #endregion addCategory

// #region editCategory
export function editCategoryAction(id, title) {
  return {
    type: EDIT_CATEGORY,
    id,
    title,
  };
}
export function editCategorySuccessAction(data) {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    data,
  };
}
export function editCategoryFailAction(error) {
  return {
    type: EDIT_CATEGORY_FAIL,
    error,
  };
}
// #endregion editCategory

// #region getPlayLists
export function getPlayListsAction() {
  return {
    type: GET_PLAYLISTS,
  };
}
export function getPlayListsSuccessAction(data) {
  return {
    type: GET_PLAYLISTS_SUCCESS,
    data,
  };
}
export function getPlayListsFailAction(error) {
  return {
    type: GET_PLAYLISTS_FAIL,
    error,
  };
}
// #endregion getPlayLists

// #region getPlayList
export function getPlayListAction(id) {
  return {
    type: GET_PLAYLIST,
    id,
  };
}
export function getPlayListSuccessAction(data) {
  return {
    type: GET_PLAYLIST_SUCCESS,
    data,
  };
}
export function getPlayListFailAction(error) {
  return {
    type: GET_PLAYLIST_FAIL,
    error,
  };
}
// #endregion getPlayLists

// #region addPlayList
export function addPlayListAction(title) {
  return {
    type: ADD_PLAYLIST,
    title,
  };
}
export function addPlayListSuccessAction(data) {
  return {
    type: ADD_PLAYLIST_SUCCESS,
    data,
  };
}
export function addPlayListFailAction(error) {
  return {
    type: ADD_PLAYLIST_FAIL,
    error,
  };
}
// #endregion addPlayList

// #region uploadBanner
export function uploadBannerAction(file) {
  return {
    type: BANNER_UPLOAD,
    file,
  };
}
export function uploadBannerSuccessAction(data) {
  return {
    type: BANNER_UPLOAD_SUCCESS,
    data,
  };
}
export function uploadBannerFailAction(error) {
  return {
    type: BANNER_UPLOAD_FAIL,
    error,
  };
}
// #endregion uploadBanner

// #region unfollowAction
export function unfollowAction(name) {
  return {
    type: UNFOLLOW_CHANNEL,
    name,
  };
}
export function unfollowSuccessAction() {
  return {
    type: UNFOLLOW_CHANNEL_SUCCESS,
  };
}
export function unfollowFailAction(error) {
  return {
    type: UNFOLLOW_CHANNEL_FAIL,
    error,
  };
}
// #endregion unfollowAction

// #region follow
export function followAction(name) {
  return {
    type: FOLLOW_CHANNEL,
    name,
  };
}
export function followSuccessAction() {
  return {
    type: FOLLOW_CHANNEL_SUCCESS,
  };
}
export function followFailAction(error) {
  return {
    type: FOLLOW_CHANNEL_FAIL,
    error,
  };
}
// #endregion follow

// #region getFollowingList
export function getFollowingListAction() {
  return {
    type: GET_FOLLOWING_LIST,
  };
}
export function getFollowingListSuccessAction(data) {
  return {
    type: GET_FOLLOWING_LIST_SUCCESS,
    data,
  };
}
export function getFollowingListFailAction(error) {
  return {
    type: GET_FOLLOWING_LIST_FAIL,
    error,
  };
}
// #endregion getFollowingList

// #region getCommentList
export function getCommentListAction() {
  return {
    type: GET_COMMENT_LIST,
  };
}
export function getCommentListSuccessAction(data) {
  return {
    type: GET_COMMENT_LIST_SUCCESS,
    data,
  };
}
export function getCommentListFailAction(error) {
  return {
    type: GET_COMMENT_LIST_FAIL,
    error,
  };
}
// #endregion getCommentList

// #region postComment
export function postCommentAction(params) {
  return {
    type: POST_COMMENT,
    params,
  };
}
export function postCommentSuccessAction(data) {
  return {
    type: POST_COMMENT_SUCCESS,
    data,
  };
}
export function postCommentFailAction(error) {
  return {
    type: POST_COMMENT_FAIL,
    error,
  };
}
// #endregion postComment

// #region removeComment
export function removeCommentAction(id) {
  return {
    type: REMOVE_COMMENT,
    id,
  };
}
export function removeCommentSuccessAction() {
  return {
    type: REMOVE_COMMENT_SUCCESS,
  };
}
export function removeCommentFailAction(error) {
  return {
    type: REMOVE_COMMENT_FAIL,
    error,
  };
}
// #endregion removeComment

// #region acceptComment
export function acceptCommentAction(id) {
  return {
    type: ACCEPT_COMMENT,
    id,
  };
}
export function acceptCommentSuccessAction() {
  return {
    type: ACCEPT_COMMENT_SUCCESS,
  };
}
export function acceptCommentFailAction(error) {
  return {
    type: ACCEPT_COMMENT_FAIL,
    error,
  };
}
// #endregion acceptComment

// #region getChannelStatistics
export function getChannelStatisticsAction(range) {
  return {
    type: GET_CHANNEL_STATISTICS,
    range,
  };
}
export function getChannelStatisticsSuccessAction(data) {
  return {
    type: GET_CHANNEL_STATISTICS_SUCCESS,
    data,
  };
}
export function getChannelStatisticsFailAction(error) {
  return {
    type: GET_CHANNEL_STATISTICS_FAIL,
    error,
  };
}
export function getChannelStatisticsClearAction() {
  return {
    type: GET_CHANNEL_STATISTICS_CLEAR,
  };
}
// #endregion getChannelStatistics

// #region getChannelInfo
export function getChannelInfoAction(name) {
  return {
    type: GET_CHANNEL_INFO,
    name,
  };
}
export function getChannelInfoSuccessAction(data) {
  return {
    type: GET_CHANNEL_INFO_SUCCESS,
    data,
  };
}
export function getChannelInfoFailAction(error) {
  return {
    type: GET_CHANNEL_INFO_FAIL,
    error,
  };
}
export function getChannelInfoClearAction() {
  return {
    type: GET_CHANNEL_INFO_CLEAR,
  };
}
// #endregion getChannelInfo

// #region updateChannelInfo
export function updateChannelInfoAction(params) {
  return {
    type: UPDATE_CHANNEL_INFO,
    params,
  };
}
export function updateChannelInfoSuccessAction(data) {
  return {
    type: UPDATE_CHANNEL_INFO_SUCCESS,
    data,
  };
}
export function updateChannelInfoFailAction(error) {
  return {
    type: UPDATE_CHANNEL_INFO_FAIL,
    error,
  };
}
// #endregion updateChannelInfo

// #region updateChannelSocials
export function updateChannelSocialsAction(params) {
  return {
    type: UPDATE_CHANNEL_SOCIALS,
    params,
  };
}
export function updateChannelSocialsSuccessAction(data) {
  return {
    type: UPDATE_CHANNEL_SOCIALS_SUCCESS,
    data,
  };
}
export function updateChannelSocialsFailAction(error) {
  return {
    type: UPDATE_CHANNEL_SOCIALS_FAIL,
    error,
  };
}
// #endregion updateChannelSocials

// #region updateChannelUserInfo
export function updateChannelUserInfoAction(params) {
  return {
    type: UPDATE_CHANNEL_USERINFO,
    params,
  };
}
export function updateChannelUserInfoSuccessAction(data) {
  return {
    type: UPDATE_CHANNEL_USERINFO_SUCCESS,
    data,
  };
}
export function updateChannelUserInfoFailAction(error) {
  return {
    type: UPDATE_CHANNEL_USERINFO_FAIL,
    error,
  };
}
export function updateChannelUserInfoClearAction() {
  return {
    type: UPDATE_CHANNEL_USERINFO_CLEAR,
  };
}
// #endregion updateChannelUserInfo

// #region updateChannelUserInfoConfirm
export function updateChannelUserInfoConfirmAction(code) {
  return {
    type: UPDATE_CHANNEL_USERINFO_CONFIRM,
    code,
  };
}
export function updateChannelUserInfoConfirmSuccessAction(data) {
  return {
    type: UPDATE_CHANNEL_USERINFO_CONFIRM_SUCCESS,
    data,
  };
}
export function updateChannelUserInfoConfirmFailAction(error) {
  return {
    type: UPDATE_CHANNEL_USERINFO_CONFIRM_FAIL,
    error,
  };
}
// #endregion updateChannelUserInfoConfirm

// #region uploadChannelBanner
export function uploadChannelBannerAction(file) {
  return {
    type: CHANNEL_BANNER_UPLOAD,
    file,
  };
}
export function uploadChannelBannerSuccessAction(data) {
  return {
    type: CHANNEL_BANNER_UPLOAD_SUCCESS,
    data,
  };
}
export function uploadChannelBannerFailAction(error) {
  return {
    type: CHANNEL_BANNER_UPLOAD_FAIL,
    error,
  };
}
// #endregion uploadChannelBanner

// #region getUserMe
export function getUserMeAction() {
  return {
    type: GET_USER_ME,
  };
}
export function getUserMeSuccessAction(data) {
  return {
    type: GET_USER_ME_SUCCESS,
    data,
  };
}
export function getUserMeFailAction(error) {
  return {
    type: GET_USER_ME_FAIL,
    error,
  };
}
// #endregion getUserMe

// #region unregisterUser
export function unregisterUserAction() {
  return {
    type: UNREGISTER_USER,
  };
}
export function unregisterUserFailAction(error) {
  return {
    type: UNREGISTER_USER_FAIL,
    error,
  };
}
// #endregion unregisterUser

// #region getUsers
export function getUsersAction(params) {
  return {
    type: GET_USERS,
    params,
  };
}
export function getUsersSuccessAction(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFailAction(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}
// #endregion getUsers

// #region updateUser
export function updateUserAction(params) {
  return {
    type: UPDATE_USER,
    params,
  };
}
export function updateUserSuccessAction(data) {
  return {
    type: UPDATE_USER_SUCCESS,
    data,
  };
}
export function updateUserFailAction(error) {
  return {
    type: UPDATE_USER_FAIL,
    error,
  };
}
// #endregion updateUser

// #region resetUserPassword
export function resetUserPasswordAction(params) {
  return {
    type: RESET_USER_PASSWORD,
    params,
  };
}
export function resetUserPasswordSuccessAction(data) {
  return {
    type: RESET_USER_PASSWORD_SUCCESS,
    data,
  };
}
export function resetUserPasswordFailAction(error) {
  return {
    type: RESET_USER_PASSWORD_FAIL,
    error,
  };
}
// #endregion updateUser

// #region deleteUser
export function deleteUserAction(params) {
  return {
    type: DELETE_USER,
    params,
  };
}
export function deleteUserSuccessAction(data) {
  return {
    type: DELETE_USER_SUCCESS,
    data,
  };
}
export function deleteUserFailAction(error) {
  return {
    type: DELETE_USER_FAIL,
    error,
  };
}
// #endregion deleteUser

// #region logout
export function logoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}
export function logoutSuccessAction() {
  return {
    type: LOGOUT_ACTION_SUCCESS,
  };
}
export function logoutFailAction(error) {
  return {
    type: LOGOUT_ACTION_FAIL,
    error,
  };
}
// #endregion logout

// #region getCategorizedVideos
export function getCategorizedVideosAction(params) {
  return {
    type: GET_CATEGORIZED_VIDEOS,
    params,
  };
}
export function getCategorizedVideosSuccessAction(data) {
  return {
    type: GET_CATEGORIZED_VIDEOS_SUCCESS,
    data,
  };
}
export function getCategorizedVideosFailAction(error) {
  return {
    type: GET_CATEGORIZED_VIDEOS_FAIL,
    error,
  };
}
// #endregion getCategorizedVideos
