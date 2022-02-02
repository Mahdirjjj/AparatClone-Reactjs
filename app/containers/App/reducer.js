/* eslint-disable indent */
/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { getAuth } from 'utils/auth';
import { COMMENT_STATE_ACCEPTED } from 'utils/constants';
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
  GET_VIDEO_CLEAR,
  GET_VIDEO_FAIL,
  GET_VIDEO_STATISTICS,
  GET_VIDEO_STATISTICS_FAIL,
  GET_VIDEO_STATISTICS_SUCCESS,
  GET_VIDEO_SUCCESS,
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
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAIL,
  CHANGE_VIDEO_STATE_CLEAR,
  CHANGE_VIDEO_STATE,
  CHANGE_VIDEO_STATE_SUCCESS,
  CHANGE_VIDEO_STATE_FAIL,
} from './constants';

const authData = getAuth();

export const initialState = {
  error: null,
  drawerIsOpen: false,
  userMe: {
    data: authData ? authData.me : null,
    error: null,
  },
  notification: {
    title: null,
    type: null,
  },
  fileUpload: {
    file: null,
    error: null,
    data: null,
    percent: 0,
  },
  bannerUpload: {
    file: null,
    error: null,
    data: null,
  },
  createVideo: {
    params: null,
    data: null,
    error: null,
  },
  updateVideo: {
    slug: null,
    params: null,
    data: null,
    error: null,
  },
  deleteVideo: {
    slug: null,
    error: null,
  },
  getVideo: {
    slug: null,
    error: null,
    data: null,
  },
  videos: {
    params: null,
    error: null,
    data: null,
  },
  videoChangeState: {
    params: null,
    error: null,
    data: null,
  },
  getVideoStatistics: {
    range: null,
    slug: null,
    error: null,
    data: null,
  },
  likeOrDislikeVideo: {
    slug: null,
    error: null,
    data: null,
  },
  republishVideo: {
    slug: null,
    error: null,
    data: null,
  },
  myVideos: {
    params: null,
    data: null,
    error: null,
  },
  tags: {
    data: [],
    error: null,
  },
  addTag: {
    tag: null,
    data: null,
    error: null,
  },
  categories: {
    data: [],
    error: null,
  },
  myCategories: {
    withVideoCount: false,
    data: [],
    error: null,
  },
  addCategory: {
    title: null,
    data: null,
    error: null,
  },
  editCategory: {
    id: null,
    title: null,
    data: null,
    error: null,
  },

  playlists: {
    data: [],
    error: null,
  },
  playlist: {
    data: null,
    id: null,
    error: null,
  },
  addPlaylist: {
    title: null,
    data: null,
    error: null,
  },
  unfollow: {
    name: null,
    error: null,
  },
  follow: {
    name: null,
    error: null,
  },
  followingList: {
    data: null,
    error: null,
  },
  commentList: {
    data: null,
    error: null,
  },
  postComment: {
    params: null,
    data: null,
    error: null,
  },
  removeComment: {
    id: null,
    error: null,
  },
  acceptComment: {
    id: null,
    error: null,
  },
  channelStatistics: {
    range: null,
    data: null,
    error: null,
  },
  channelInfo: {
    name: null,
    data: null,
    error: null,
  },
  channelInfoUpdate: {
    params: null,
    data: null,
    error: null,
  },
  channelSocialsUpdate: {
    params: null,
    data: null,
    error: null,
  },
  channelUserInfoUpdate: {
    params: null,
    data: null,
    error: null,
  },
  channelUserInfoUpdateConfirm: {
    code: null,
    data: null,
    error: null,
  },
  channelBannerUpload: {
    file: null,
    data: null,
    error: null,
  },
  unregisterUser: {
    loading: false,
    data: null,
    error: null,
  },
  users: {
    params: null,
    data: null,
    error: null,
  },
  updateUser: {
    params: null,
    data: null,
    error: null,
  },
  resetUserPassword: {
    params: null,
    data: null,
    error: null,
  },
  deleteUser: {
    params: null,
    data: null,
    error: null,
  },
  logoutUser: {
    loading: false,
    error: null,
  },
  categorizedVideos: {
    loading: false,
    data: null,
    error: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // #region global
      case ERROR_HAPPEN:
        draft.error = action.error;
        break;
      case ERROR_CLEAR:
        draft.error = null;
        break;
      case DRAWER_OPEN:
        draft.drawerIsOpen =
          action.show === undefined ? !draft.drawerIsOpen : action.show;
        break;
      // #endregion global

      // #region NOTIFICATION
      case NOTIFICATION_SHOW:
        draft.notification.title = action.data.title;
        draft.notification.type = action.data.type;
        break;
      case NOTIFICATION_HIDE:
        draft.notification = initialState.notification;
        break;
      // #endregion NOTIFICATION

      // #region FILE_UPLOAD
      case FILE_UPLOAD:
        draft.fileUpload.percent = 0;
        draft.fileUpload.file = action.file;
        break;
      case FILE_UPLOAD_PROGRESS:
        draft.fileUpload.percent = action.percent;
        break;
      case FILE_UPLOAD_SUCCESS:
        draft.fileUpload.data = action.data;
        break;
      case FILE_UPLOAD_FAIL:
        draft.fileUpload.percent = 0;
        draft.fileUpload.error = action.error;
        break;
      // #endregion FILE_UPLOAD

      // #region BANNER_UPLOAD
      case BANNER_UPLOAD:
        draft.bannerUpload.file = action.file;
        draft.bannerUpload.error = null;
        draft.bannerUpload.data = null;
        break;
      case BANNER_UPLOAD_SUCCESS:
        draft.bannerUpload.file = null;
        draft.bannerUpload.error = null;
        draft.bannerUpload.data = action.data;
        break;
      case BANNER_UPLOAD_FAIL:
        draft.bannerUpload.file = null;
        draft.bannerUpload.error = action.error;
        break;
      // #endregion BANNER_UPLOAD

      // #region CREATE_VIDEO
      case CREATE_VIDEO:
        draft.createVideo.params = action.params;
        draft.createVideo.data = null;
        draft.createVideo.error = null;
        break;
      case CREATE_VIDEO_SUCCESS:
        draft.createVideo.params = null;
        draft.createVideo.error = null;
        draft.createVideo.data = action.data;
        break;
      case CREATE_VIDEO_FAIL:
        draft.createVideo.params = null;
        draft.createVideo.data = null;
        draft.createVideo.error = action.error;
        break;
      case CREATE_VIDEO_CLEAR:
        draft.createVideo = initialState.createVideo;
        draft.bannerUpload = initialState.bannerUpload;
        draft.fileUpload = initialState.fileUpload;
        draft.getVideo = initialState.getVideo;
        break;
      // #endregion CREATE_VIDEO

      // #region UPDATE_VIDEO
      case UPDATE_VIDEO:
        draft.updateVideo.slug = action.slug;
        draft.updateVideo.params = action.params;
        draft.updateVideo.data = null;
        draft.updateVideo.error = null;
        break;
      case UPDATE_VIDEO_SUCCESS:
        draft.updateVideo.slug = null;
        draft.updateVideo.params = null;
        draft.updateVideo.error = null;
        draft.updateVideo.data = action.data;
        break;
      case UPDATE_VIDEO_FAIL:
        draft.updateVideo.slug = null;
        draft.updateVideo.params = null;
        draft.updateVideo.data = null;
        draft.updateVideo.error = action.error;
        break;
      case UPDATE_VIDEO_CLEAR:
        draft.updateVideo = initialState.createVideo;
        draft.getVideo = initialState.getVideo;
        draft.bannerUpload = initialState.bannerUpload;
        break;
      // #endregion UPDATE_VIDEO

      // #region DELETE_VIDEO
      case DELETE_VIDEO:
        draft.deleteVideo.slug = action.slug;
        draft.deleteVideo.error = null;
        break;
      case DELETE_VIDEO_SUCCESS:
        draft.deleteVideo.slug = null;
        draft.deleteVideo.error = null;
        draft.myVideos.data = state.myVideos.data.filter(
          item => item.slug !== state.deleteVideo.slug,
        );
        break;
      case DELETE_VIDEO_FAIL:
        draft.deleteVideo.slug = null;
        draft.deleteVideo.error = {
          error: action.error,
          slug: state.deleteVideo.slug,
        };
        break;
      case DELETE_VIDEO_CLEAR_ERROR_ACTION:
        draft.deleteVideo.error = null;
        break;
      // #endregion DELETE_VIDEO

      // #region LIST_MY_VIDEOS
      case LIST_MY_VIDEOS:
        draft.myVideos.params = action.params;
        draft.myVideos.error = null;
        break;
      case LIST_MY_VIDEOS_SUCCESS:
        draft.myVideos.params = null;
        draft.myVideos.error = null;
        draft.myVideos.data = action.data;
        break;
      case LIST_MY_VIDEOS_FAIL:
        draft.myVideos.params = null;
        draft.myVideos.error = action.error;
        break;
      // #endregion LIST_MY_VIDEOS

      // #region GET_VIDEO
      case GET_VIDEO:
        draft.getVideo.slug = action.slug;
        draft.getVideo.error = null;
        break;
      case GET_VIDEO_SUCCESS:
        draft.getVideo.slug = null;
        draft.getVideo.error = null;
        draft.getVideo.data = action.data;
        break;
      case GET_VIDEO_FAIL:
        draft.getVideo.slug = null;
        draft.getVideo.data = null;
        draft.getVideo.error = action.error;
        break;
      case GET_VIDEO_CLEAR:
        draft.getVideo = initialState.getVideo;
        draft.getVideoStatistics = initialState.getVideoStatistics;
        break;
      // #endregion GET_VIDEO

      // #region GET_VIDEOS
      case GET_VIDEOS:
        draft.videos.params = action.params;
        draft.videos.error = null;
        draft.videos.data = null;
        break;
      case GET_VIDEOS_SUCCESS:
        draft.videos.params = null;
        draft.videos.error = null;
        draft.videos.data = action.data;
        break;
      case GET_VIDEOS_FAIL:
        draft.videos.params = null;
        draft.videos.data = null;
        draft.videos.error = action.error;
        break;
      // #endregion GET_VIDEOS

      // #region CHANGE_VIDEO_STATE
      case CHANGE_VIDEO_STATE_CLEAR:
        draft.videoChangeState.params = null;
        draft.videoChangeState.error = null;
        draft.videoChangeState.data = null;
        break;
      case CHANGE_VIDEO_STATE:
        draft.videoChangeState.params = action.params;
        draft.videoChangeState.error = null;
        draft.videoChangeState.data = null;
        break;
      case CHANGE_VIDEO_STATE_SUCCESS:
        draft.videoChangeState.params = null;
        draft.videoChangeState.error = null;
        if (state.videos.data && state.videos.data.data) {
          draft.videos.data.data = state.videos.data.data.map(item =>
            item.slug === state.videoChangeState.params.slug
              ? { ...item, state: state.videoChangeState.params.state }
              : item,
          );
        }
        draft.videoChangeState.data = action.data;
        break;
      case CHANGE_VIDEO_STATE_FAIL:
        draft.videoChangeState.params = null;
        draft.videoChangeState.data = null;
        draft.videoChangeState.error = action.error;
        break;
      // #endregion CHANGE_VIDEO_STATE

      // #region GET_VIDEO_STATISTICS
      case GET_VIDEO_STATISTICS:
        draft.getVideoStatistics.range = action.range;
        draft.getVideoStatistics.slug = action.slug;
        draft.getVideoStatistics.error = null;
        break;
      case GET_VIDEO_STATISTICS_SUCCESS:
        draft.getVideoStatistics.range = null;
        draft.getVideoStatistics.slug = null;
        draft.getVideoStatistics.error = null;
        draft.getVideoStatistics.data = action.data;
        break;
      case GET_VIDEO_STATISTICS_FAIL:
        draft.getVideoStatistics.range = null;
        draft.getVideoStatistics.slug = null;
        draft.getVideoStatistics.data = null;
        draft.getVideoStatistics.error = action.error;
        break;
      // #endregion GET_VIDEO_STATISTICS

      // #region LIKE_OR_DISLIKE_VIDEO
      case LIKE_OR_DISLIKE_VIDEO:
        draft.likeOrDislikeVideo.slug = action.slug;
        draft.likeOrDislikeVideo.like = action.like;
        draft.likeOrDislikeVideo.error = null;
        draft.likeOrDislikeVideo.data = null;
        break;
      case LIKE_OR_DISLIKE_VIDEO_SUCCESS:
        draft.likeOrDislikeVideo.slug = null;
        draft.likeOrDislikeVideo.like = null;
        draft.getVideo.data.liked = state.likeOrDislikeVideo.like ? 1 : 0;
        draft.getVideo.data.likeCount = state.likeOrDislikeVideo.like
          ? state.getVideo.data.likeCount + 1
          : state.getVideo.data.likeCount - 1;
        draft.likeOrDislikeVideo.data = action.data;
        break;
      case LIKE_OR_DISLIKE_VIDEO_FAIL:
        draft.likeOrDislikeVideo.slug = null;
        draft.likeOrDislikeVideo.like = null;
        draft.likeOrDislikeVideo.error = action.error;
        break;
      case LIKE_OR_DISLIKE_VIDEO_CLEAR:
        draft.likeOrDislikeVideo.slug = null;
        draft.likeOrDislikeVideo.like = null;
        draft.likeOrDislikeVideo.error = null;
        draft.likeOrDislikeVideo.data = null;
        break;
      // #endregion LIKE_OR_DISLIKE_VIDEO

      // #region REPUBLISH_VIDEO
      case REPUBLISH_VIDEO:
        draft.republishVideo.slug = action.slug;
        draft.republishVideo.error = null;
        draft.republishVideo.data = null;
        break;
      case REPUBLISH_VIDEO_SUCCESS:
        draft.republishVideo.slug = null;
        draft.republishVideo.data = action.data;
        break;
      case REPUBLISH_VIDEO_FAIL:
        draft.republishVideo.slug = null;
        draft.republishVideo.error = action.error;
        break;
      case REPUBLISH_VIDEO_CLEAR:
        draft.republishVideo.slug = null;
        draft.republishVideo.error = null;
        draft.republishVideo.data = null;
        break;
      // #endregion REPUBLISH_VIDEO

      // #region GET_TAGS
      case GET_TAGS:
        draft.tags.error = null;
        break;
      case GET_TAGS_SUCCESS:
        draft.tags.error = null;
        draft.tags.data = Object.values(action.data);
        break;
      case GET_TAGS_FAIL:
        draft.tags.error = action.error;
        break;
      // #endregion GET_TAGS

      // #region ADD_TAG
      case ADD_TAG:
        draft.addTag.error = null;
        draft.addTag.data = null;
        draft.addTag.tag = action.tag;
        break;
      case ADD_TAG_SUCCESS:
        draft.addTag.tag = null;
        draft.addTag.error = null;
        draft.addTag.data = action.data;
        break;
      case ADD_TAG_FAIL:
        draft.addTag.data = [];
        draft.addTag.error = action.error;
        break;
      // #endregion ADD_TAG

      // #region GET_CATEGORIES
      case GET_CATEGORIES:
        draft.categories.error = null;
        break;
      case GET_CATEGORIES_SUCCESS:
        draft.categories.data = Object.values(action.data);
        break;
      case GET_CATEGORIES_FAIL:
        draft.categories.error = action.error;
        break;
      // #endregion GET_CATEGORIES

      // #region GET_MY_CATEGORIES
      case GET_MY_CATEGORIES:
        draft.myCategories = initialState.myCategories;
        draft.myCategories.withVideoCount = action.withVideoCount;
        break;
      case GET_MY_CATEGORIES_SUCCESS:
        draft.myCategories.data = action.data;
        break;
      case GET_MY_CATEGORIES_FAIL:
        draft.myCategories.error = action.error;
        break;
      // #endregion GET_MY_CATEGORIES

      // #region ADD_CATEGORY
      case ADD_CATEGORY:
        draft.addCategory.error = null;
        draft.addCategory.data = null;
        draft.addCategory.title = action.title;
        break;
      case ADD_CATEGORY_SUCCESS:
        draft.addCategory.title = null;
        draft.addCategory.error = null;
        draft.addCategory.data = action.data;
        draft.myCategories.data = [
          ...(state.myCategories.data || []),
          action.data,
        ];
        draft.categories.data = [...(state.categories.data || []), action.data];
        break;
      case ADD_CATEGORY_FAIL:
        draft.addCategory.data = null;
        draft.addCategory.error = action.error;
        break;
      // #endregion ADD_CATEGORY

      // #region EDIT_CATEGORY
      case EDIT_CATEGORY:
        draft.editCategory.error = null;
        draft.editCategory.data = null;
        draft.editCategory.id = action.id;
        draft.editCategory.title = action.title;
        break;
      case EDIT_CATEGORY_SUCCESS:
        draft.editCategory.id = null;
        draft.editCategory.title = null;
        draft.editCategory.error = null;
        draft.editCategory.data = action.data;

        draft.myCategories.data = state.myCategories.data.map(item =>
          item.id === state.editCategory.id
            ? { ...item, title: state.editCategory.title }
            : item,
        );

        draft.categories.data = state.categories.data.map(item =>
          item.id === state.editCategory.id
            ? { ...item, title: state.editCategory.title }
            : item,
        );
        break;
      case EDIT_CATEGORY_FAIL:
        draft.editCategory.id = null;
        draft.editCategory.title = null;
        draft.editCategory.data = null;
        draft.editCategory.error = action.error;
        break;
      // #endregion EDIT_CATEGORY

      // #region GET_PLAYLISTS
      case GET_PLAYLISTS:
        draft.playlists.error = null;
        break;
      case GET_PLAYLISTS_SUCCESS:
        draft.playlist.error = null;
        draft.playlists.data = Object.values(action.data);
        break;
      case GET_PLAYLISTS_FAIL:
        draft.playlists.error = action.error;
        break;
      // #endregion GET_PLAYLISTS

      // #region GET_PLAYLIST
      case GET_PLAYLIST:
        draft.playlist.id = action.id;
        draft.playlist.data = null;
        draft.playlist.error = null;
        break;
      case GET_PLAYLIST_SUCCESS:
        draft.playlist.id = null;
        draft.playlist.data = action.data;
        break;
      case GET_PLAYLIST_FAIL:
        draft.playlist.id = null;
        draft.playlist.error = action.error;
        break;
      // #endregion GET_PLAYLIST

      // #region ADD_PLAYLIST
      case ADD_PLAYLIST:
        draft.addPlaylist.error = null;
        draft.addPlaylist.data = null;
        draft.addPlaylist.title = action.title;
        break;
      case ADD_PLAYLIST_SUCCESS:
        draft.addPlaylist.title = null;
        draft.addPlaylist.error = null;
        draft.addPlaylist.data = action.data;
        break;
      case ADD_PLAYLIST_FAIL:
        draft.addPlaylist.data = null;
        draft.addPlaylist.error = action.error;
        break;
      // #endregion ADD_PLAYLIST

      // #region FOLLOW_CHANNEL
      case FOLLOW_CHANNEL:
        draft.follow.error = null;
        draft.follow.name = action.name;
        break;
      case FOLLOW_CHANNEL_SUCCESS:
        if (state.followingList.data) {
          draft.followingList.data = state.followingList.data.map(item => {
            if (item.name === state.follow.name) {
              return {
                ...item,
                unfollowed: false,
                followed: true,
              };
            }

            return item;
          });
        }
        if (state.getVideo.data) {
          draft.getVideo.data.channel.is_followed = true;
        }
        if (state.channelInfo.data) {
          draft.channelInfo.data.channel.is_followed = true;
        }
        draft.follow.name = null;
        break;
      case FOLLOW_CHANNEL_FAIL:
        draft.follow.name = null;
        draft.follow.error = action.error;
        break;
      // #endregion FOLLOW_CHANNEL

      // #region UNFOLLOW_CHANNEL
      case UNFOLLOW_CHANNEL:
        draft.unfollow.error = null;
        draft.unfollow.name = action.name;
        break;
      case UNFOLLOW_CHANNEL_SUCCESS:
        if (state.followingList.data) {
          draft.followingList.data = state.followingList.data.map(item => {
            if (item.name === state.unfollow.name) {
              return {
                ...item,
                unfollowed: true,
                followed: false,
              };
            }

            return item;
          });
        }
        if (state.getVideo.data) {
          draft.getVideo.data.channel.is_followed = false;
        }
        if (state.channelInfo.data) {
          draft.channelInfo.data.channel.is_followed = false;
        }
        draft.unfollow.name = null;
        break;
      case UNFOLLOW_CHANNEL_FAIL:
        draft.unfollow.name = null;
        draft.unfollow.error = action.error;
        break;
      // #endregion UNFOLLOW_CHANNEL

      // #region GET_FOLLOWING_LIST
      case GET_FOLLOWING_LIST:
        draft.followingList.error = null;
        draft.followingList.data = null;
        break;
      case GET_FOLLOWING_LIST_SUCCESS:
        draft.followingList.data = action.data;
        break;
      case GET_FOLLOWING_LIST_FAIL:
        draft.followingList.error = action.error;
        break;
      // #endregion GET_FOLLOWING_LIST

      // #region GET_COMMENT_LIST
      case GET_COMMENT_LIST:
        draft.commentList.error = null;
        draft.commentList.data = null;
        draft.postComment = state.postComment;
        draft.removeComment = state.removeComment;
        break;
      case GET_COMMENT_LIST_SUCCESS:
        draft.commentList.data = action.data;
        break;
      case GET_COMMENT_LIST_FAIL:
        draft.commentList.error = action.error;
        break;
      // #endregion GET_COMMENT_LIST

      // #region POST_COMMENT
      case POST_COMMENT:
        draft.postComment.params = action.params;
        draft.postComment.error = null;
        draft.postComment.data = null;
        break;
      case POST_COMMENT_SUCCESS:
        draft.postComment.data = action.data;
        draft.postComment.params = null;
        if (state.getVideo.data && state.postComment.params.parent_id) {
          if (
            state.getVideo.data.comments &&
            state.getVideo.data.comments.length
          ) {
            draft.getVideo.data.comments = draft.getVideo.data.comments.map(
              comment =>
                comment.id === state.postComment.params.parent_id
                  ? {
                      ...comment,
                      children: [
                        ...comment.children,
                        {
                          ...action.data,
                          user: {
                            id: state.userMe.data.id,
                            avatar: state.userMe.data.avatar,
                            name: state.userMe.data.name,
                          },
                        },
                      ],
                    }
                  : comment,
            );
          } else {
            draft.getVideo.data.comments = [];
          }
        }
        break;
      case POST_COMMENT_FAIL:
        draft.postComment.params = null;
        draft.postComment.error = action.error;
        break;
      // #endregion POST_COMMENT

      // #region REMOVE_COMMENT
      case REMOVE_COMMENT:
        draft.removeComment.id = action.id;
        draft.removeComment.error = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        draft.commentList.data = state.commentList.data.filter(
          item =>
            item.id !== state.removeComment.id &&
            item.parent_id !== state.removeComment.id,
        );
        draft.removeComment.id = null;
        break;
      case REMOVE_COMMENT_FAIL:
        draft.removeComment.id = null;
        draft.removeComment.error = action.error;
        break;
      // #endregion REMOVE_COMMENT

      // #region ACCEPT_COMMENT
      case ACCEPT_COMMENT:
        draft.acceptComment.id = action.id;
        draft.acceptComment.error = null;
        break;
      case ACCEPT_COMMENT_SUCCESS:
        draft.commentList.data = state.commentList.data.map(item => {
          if (item.id === state.acceptComment.id) {
            return { ...item, state: COMMENT_STATE_ACCEPTED };
          }

          return item;
        });
        draft.acceptComment.id = null;
        break;
      case ACCEPT_COMMENT_FAIL:
        draft.acceptComment.id = null;
        draft.acceptComment.error = action.error;
        break;
      // #endregion ACCEPT_COMMENT

      // #region GET_CHANNEL_STATISTICS
      case GET_CHANNEL_STATISTICS:
        draft.channelStatistics.range = action.range;
        draft.channelStatistics.error = null;
        break;
      case GET_CHANNEL_STATISTICS_SUCCESS:
        draft.channelStatistics.range = null;
        draft.channelStatistics.error = null;
        draft.channelStatistics.data = action.data;
        break;
      case GET_CHANNEL_STATISTICS_FAIL:
        draft.channelStatistics.range = null;
        draft.channelStatistics.data = null;
        draft.channelStatistics.error = action.error;
        break;
      case GET_CHANNEL_STATISTICS_CLEAR:
        draft.channelStatistics = initialState.channelStatistics;
        break;
      // #endregion GET_CHANNEL_STATISTICS

      // #region GET_CHANNEL_INFO
      case GET_CHANNEL_INFO:
        draft.channelInfo.name = action.name;
        draft.channelInfo.error = null;
        break;
      case GET_CHANNEL_INFO_SUCCESS:
        draft.channelInfo.name = null;
        draft.channelInfo.data = action.data;
        break;
      case GET_CHANNEL_INFO_FAIL:
        draft.channelInfo.name = null;
        draft.channelInfo.data = null;
        draft.channelInfo.error = action.error;
        break;
      case GET_CHANNEL_INFO_CLEAR:
        draft.channelInfo = initialState.channelInfo;
        break;
      // #endregion GET_CHANNEL_INFO

      // #region UPDATE_CHANNEL_INFO
      case UPDATE_CHANNEL_INFO:
        draft.channelInfoUpdate.params = action.params;
        draft.channelInfoUpdate.data = null;
        draft.channelInfoUpdate.error = null;
        break;
      case UPDATE_CHANNEL_INFO_SUCCESS:
        draft.channelInfoUpdate.params = null;
        draft.channelInfoUpdate.data = action.data;
        draft.userMe.data.website = state.channelInfoUpdate.params.website;
        draft.userMe.data.channel.name = state.channelInfoUpdate.params.name;
        draft.userMe.data.channel.info = state.channelInfoUpdate.params.info;
        break;
      case UPDATE_CHANNEL_INFO_FAIL:
        draft.channelInfoUpdate.params = null;
        draft.channelInfoUpdate.data = null;
        draft.channelInfoUpdate.error = action.error;
        break;
      // #endregion UPDATE_CHANNEL_INFO

      // #region UPDATE_CHANNEL_SOCIALS
      case UPDATE_CHANNEL_SOCIALS:
        draft.channelSocialsUpdate.params = action.params;
        draft.channelSocialsUpdate.data = null;
        draft.channelSocialsUpdate.error = null;
        break;
      case UPDATE_CHANNEL_SOCIALS_SUCCESS:
        draft.channelSocialsUpdate.params = null;
        draft.channelSocialsUpdate.data = action.data;
        draft.userMe.data.channel.socials =
          state.channelSocialsUpdate.params.socials;
        break;
      case UPDATE_CHANNEL_SOCIALS_FAIL:
        draft.channelSocialsUpdate.params = null;
        draft.channelSocialsUpdate.data = null;
        draft.channelSocialsUpdate.error = action.error;
        break;
      // #endregion UPDATE_CHANNEL_SOCIALS

      // #region UPDATE_CHANNEL_USERINFO
      case UPDATE_CHANNEL_USERINFO:
        draft.channelUserInfoUpdate.params = action.params;
        draft.channelUserInfoUpdate.data = null;
        draft.channelUserInfoUpdate.error = null;
        break;
      case UPDATE_CHANNEL_USERINFO_SUCCESS:
        draft.channelUserInfoUpdate.params = null;
        draft.channelUserInfoUpdate.data = action.data;
        break;
      case UPDATE_CHANNEL_USERINFO_FAIL:
        draft.channelUserInfoUpdate.params = null;
        draft.channelUserInfoUpdate.error = action.error;
        break;
      case UPDATE_CHANNEL_USERINFO_CLEAR:
        draft.channelUserInfoUpdate.params = null;
        draft.channelUserInfoUpdate.data = null;
        draft.channelUserInfoUpdate.error = null;
        draft.channelUserInfoUpdateConfirm.code = null;
        draft.channelUserInfoUpdateConfirm.data = null;
        draft.channelUserInfoUpdateConfirm.error = null;
        break;
      // #endregion UPDATE_CHANNEL_USERINFO

      // #region UPDATE_CHANNEL_USERINFO_CONFIRM
      case UPDATE_CHANNEL_USERINFO_CONFIRM:
        draft.channelUserInfoUpdateConfirm.code = action.code;
        draft.channelUserInfoUpdateConfirm.data = null;
        draft.channelUserInfoUpdateConfirm.error = null;
        break;
      case UPDATE_CHANNEL_USERINFO_CONFIRM_SUCCESS:
        draft.channelUserInfoUpdateConfirm.params = null;
        draft.channelUserInfoUpdateConfirm.data = action.data;
        draft.userMe.data = { ...state.userMe.data, ...action.data };
        break;
      case UPDATE_CHANNEL_USERINFO_CONFIRM_FAIL:
        draft.channelUserInfoUpdateConfirm.params = null;
        draft.channelUserInfoUpdateConfirm.error = action.error;
        break;
      // #endregion UPDATE_CHANNEL_USERINFO_CONFIRM

      // #region CHANNEL_BANNER_UPLOAD
      case CHANNEL_BANNER_UPLOAD:
        draft.channelBannerUpload.file = action.file;
        draft.channelBannerUpload.error = null;
        draft.channelBannerUpload.data = null;
        break;
      case CHANNEL_BANNER_UPLOAD_SUCCESS:
        draft.channelBannerUpload.file = null;
        draft.channelBannerUpload.error = null;
        draft.channelBannerUpload.data = action.data;
        draft.userMe.data.avatar = action.data.banner;
        break;
      case CHANNEL_BANNER_UPLOAD_FAIL:
        draft.channelBannerUpload.file = null;
        draft.channelBannerUpload.error = action.error;
        break;
      // #endregion CHANNEL_BANNER_UPLOAD

      // #region GET_USER_ME
      case GET_USER_ME:
        draft.userMe.error = null;
        break;
      case GET_USER_ME_SUCCESS:
        draft.userMe.error = null;
        draft.userMe.data = action.data;
        break;
      case GET_USER_ME_FAIL:
        draft.userMe.data = null;
        draft.userMe.error = action.error;
        break;
      // #endregion GET_USER_ME

      // #region UNREGISTER_USER
      case UNREGISTER_USER:
        draft.unregisterUser.loading = true;
        draft.unregisterUser.data = null;
        draft.unregisterUser.error = null;
        break;
      case UNREGISTER_USER_FAIL:
        draft.unregisterUser.loading = false;
        draft.unregisterUser.error = action.error;
        break;
      // #endregion UNREGISTER_USER

      // #region GET_USERS
      case GET_USERS:
        draft.users.params = action.params;
        draft.users.error = null;
        draft.users.data = null;
        break;
      case GET_USERS_SUCCESS:
        draft.users.params = null;
        draft.users.error = null;
        draft.users.data = action.data;
        break;
      case GET_USERS_FAIL:
        draft.users.params = null;
        draft.users.data = null;
        draft.users.error = action.error;
        break;
      // #endregion GET_USERS

      // #region UPDATE_USER
      case UPDATE_USER:
        draft.updateUser.params = action.params;
        draft.updateUser.error = null;
        draft.updateUser.data = null;
        break;
      case UPDATE_USER_SUCCESS:
        draft.updateUser.params = null;
        draft.updateUser.error = null;
        draft.updateUser.data = action.data;
        if (state.users.data && state.users.data.data) {
          draft.users.data.data = state.users.data.data.map(item =>
            item.id === state.updateUser.params.id
              ? { ...item, ...action.data }
              : item,
          );
        }
        break;
      case UPDATE_USER_FAIL:
        draft.updateUser.params = null;
        draft.updateUser.data = null;
        draft.updateUser.error = action.error;
        break;
      // #endregion UPDATE_USER

      // #region RESET_USER_PASSWORD
      case RESET_USER_PASSWORD:
        draft.resetUserPassword.params = action.params;
        draft.resetUserPassword.error = null;
        draft.resetUserPassword.data = null;
        break;
      case RESET_USER_PASSWORD_SUCCESS:
        draft.resetUserPassword.params = null;
        draft.resetUserPassword.error = null;
        draft.resetUserPassword.data = action.data;
        break;
      case RESET_USER_PASSWORD_FAIL:
        draft.resetUserPassword.params = null;
        draft.resetUserPassword.data = null;
        draft.resetUserPassword.error = action.error;
        break;
      // #endregion RESET_USER_PASSWORD

      // #region DELETE_USER
      case DELETE_USER:
        draft.deleteUser.params = action.params;
        draft.deleteUser.error = null;
        draft.deleteUser.data = null;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUser.params = null;
        draft.deleteUser.error = null;
        draft.deleteUser.data = action.data;
        if (state.users.data && state.users.data.data) {
          draft.users.data.data = state.users.data.data.filter(
            item => item.id !== state.deleteUser.params.id,
          );
        }
        break;
      case DELETE_USER_FAIL:
        draft.deleteUser.params = null;
        draft.deleteUser.data = null;
        draft.deleteUser.error = action.error;
        break;
      // #endregion DELETE_USER

      // #region LOGOUT_ACTION
      case LOGOUT_ACTION:
        draft.logoutUser.loading = true;
        draft.logoutUser.error = null;
        break;
      case LOGOUT_ACTION_SUCCESS:
        Object.keys(initialState).forEach(key => {
          draft[key] = initialState[key];
        });
        draft.userMe.data = null;
        break;
      case LOGOUT_ACTION_FAIL:
        draft.logoutUser.loading = false;
        draft.logoutUser.error = action.error;
        break;
      // #endregion LOGOUT_ACTION

      // #region GET_CATEGORIZED_VIDEOS
      case GET_CATEGORIZED_VIDEOS:
        draft.categorizedVideos.loading = true;
        draft.categorizedVideos.params = action.params;
        draft.categorizedVideos.error = null;
        break;
      case GET_CATEGORIZED_VIDEOS_SUCCESS:
        draft.categorizedVideos.loading = false;
        draft.categorizedVideos.error = null;
        draft.categorizedVideos.params = null;
        draft.categorizedVideos.data = action.data;
        break;
      case GET_CATEGORIZED_VIDEOS_FAIL:
        draft.categorizedVideos.loading = false;
        draft.categorizedVideos.params = null;
        draft.categorizedVideos.error = action.error;
        break;
      // #endregion GET_CATEGORIZED_VIDEOS

      default:
        break;
    }
  });

export default appReducer;
