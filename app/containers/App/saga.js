import {
  addCategoryApi,
  editCategoryApi,
  getCategoriesApi,
  getMyCategoriesApi,
} from 'api/categories';
import {
  getChannelInfoApi,
  getChannelStatisticsApi,
  updateChannelInfoApi,
  updateChannelSocialsApi,
  updateChannelUserInfoApi,
  updateChannelUserInfoConfirmApi,
  uploadChannelBannerApi,
} from 'api/channels';
import {
  changeCommentStateApi,
  getCommetnListApi,
  postCommentApi,
  removeCommentApi,
} from 'api/comments';
import { addPlaylistApi, getPlaylistsApi, getPlaylistApi } from 'api/playlists';
import { addTagApi, getTagsApi } from 'api/tags';
import {
  followApi,
  followerListApi,
  followingListApi,
  getUserMeApi,
  getUsersApi,
  updateUserApi,
  resetUserPasswordApi,
  logoutApi,
  unfollowApi,
  deleteUserApi,
  unregisterUserApi,
} from 'api/users';
import {
  createVideoApi,
  deleteVideoApi,
  getCategorizedVideosApi,
  getMyVideosApi,
  getVideoApi,
  getVideosApi,
  changeVideoStateApi,
  getVideoStatisticsApi,
  likeOrDislikeVideoApi,
  republishVideoApi,
  updateVideoApi,
  uploadBannerApi,
  uploadVideoApi,
} from 'api/videos';
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_SUCCESS,
} from 'components/NotificationBox';
import { push } from 'connected-react-router';
import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { getAuth, setAuth } from 'utils/auth';
import {
  COMMENT_STATE_ACCEPTED,
  FOLLOW_TYPE_FOLLOWERS,
  FOLLOW_TYPE_FOLLOWINGS,
} from 'utils/constants';
import {
  acceptCommentFailAction,
  acceptCommentSuccessAction,
  addCategoryFailAction,
  addCategorySuccessAction,
  addPlayListSuccessAction,
  addTagFailAction,
  addTagSuccessAction,
  createVideoFailAction,
  createVideoSuccessAction,
  deleteVideoFailAction,
  deleteVideoSuccessAction,
  editCategoryFailAction,
  editCategorySuccessAction,
  fileUploadFailAction,
  fileUploadProgressAction,
  fileUploadSuccessAction,
  followFailAction,
  followSuccessAction,
  getCategoriesFailAction,
  getCategoriesSuccessAction,
  getCategorizedVideosFailAction,
  getCategorizedVideosSuccessAction,
  getChannelInfoFailAction,
  getChannelInfoSuccessAction,
  getChannelStatisticsSuccessAction,
  getCommentListFailAction,
  getCommentListSuccessAction,
  getFollowingListFailAction,
  getFollowingListSuccessAction,
  getMyCategoriesFailAction,
  getMyCategoriesSuccessAction,
  getMyVideosFailAction,
  getMyVideosSuccessAction,
  getPlayListsFailAction,
  getPlayListsSuccessAction,
  getTagsFailAction,
  getTagsSuccessAction,
  getUserMeFailAction,
  getUserMeSuccessAction,
  getVideoFailAction,
  getVideoStatisticsFailAction,
  getVideoStatisticsSuccessAction,
  getVideoSuccessAction,
  likeOrDislikeFailAction,
  likeOrDislikeSuccessAction,
  logoutFailAction,
  logoutSuccessAction,
  notificationShowAction,
  postCommentFailAction,
  postCommentSuccessAction,
  removeCommentFailAction,
  removeCommentSuccessAction,
  republishVideoFailAction,
  republishVideoSuccessAction,
  unfollowFailAction,
  unfollowSuccessAction,
  unregisterUserFailAction,
  updateChannelInfoFailAction,
  updateChannelInfoSuccessAction,
  updateChannelSocialsFailAction,
  updateChannelSocialsSuccessAction,
  updateChannelUserInfoConfirmFailAction,
  updateChannelUserInfoConfirmSuccessAction,
  updateChannelUserInfoFailAction,
  updateChannelUserInfoSuccessAction,
  updateVideoFailAction,
  updateVideoSuccessAction,
  uploadBannerFailAction,
  uploadBannerSuccessAction,
  uploadChannelBannerFailAction,
  uploadChannelBannerSuccessAction,
  getPlayListSuccessAction,
  getPlayListFailAction,
  getUsersFailAction,
  getUsersSuccessAction,
  updateUserSuccessAction,
  updateUserFailAction,
  resetUserPasswordSuccessAction,
  resetUserPasswordFailAction,
  deleteUserSuccessAction,
  deleteUserFailAction,
  getVideosSuccessAction,
  getVideosFailAction,
  changeVideoStateSuccessAction,
  changeVideoStateFailAction,
} from './actions';
import {
  ACCEPT_COMMENT,
  ADD_CATEGORY,
  ADD_PLAYLIST,
  ADD_TAG,
  BANNER_UPLOAD,
  CHANNEL_BANNER_UPLOAD,
  CREATE_VIDEO,
  DELETE_VIDEO,
  EDIT_CATEGORY,
  FILE_UPLOAD,
  FOLLOW_CHANNEL,
  GET_CATEGORIES,
  GET_CATEGORIZED_VIDEOS,
  GET_CHANNEL_INFO,
  GET_CHANNEL_STATISTICS,
  GET_COMMENT_LIST,
  GET_FOLLOWING_LIST,
  GET_MY_CATEGORIES,
  GET_PLAYLISTS,
  GET_TAGS,
  GET_USER_ME,
  GET_VIDEO,
  GET_VIDEO_STATISTICS,
  LIKE_OR_DISLIKE_VIDEO,
  LIST_MY_VIDEOS,
  LOGOUT_ACTION,
  POST_COMMENT,
  REMOVE_COMMENT,
  REPUBLISH_VIDEO,
  UNFOLLOW_CHANNEL,
  UNREGISTER_USER,
  UPDATE_CHANNEL_INFO,
  UPDATE_CHANNEL_SOCIALS,
  UPDATE_CHANNEL_USERINFO,
  UPDATE_CHANNEL_USERINFO_CONFIRM,
  UPDATE_VIDEO,
  GET_PLAYLIST,
  GET_USERS,
  UPDATE_USER,
  RESET_USER_PASSWORD,
  DELETE_USER,
  GET_VIDEOS,
  CHANGE_VIDEO_STATE,
} from './constants';
import { ROUTE_LOGIN } from './routes';
import { makeSelectPlaylists, makeSelectTags } from './selectors';

const identity = a => a;

const createAsyncUpload = file => {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  const promise = uploadVideoApi(file, function promiseFunction(e) {
    emit((e.loaded * 100) / e.total);
  })
    .then(response => emit({ state: 'ok', response }))
    .catch(error => emit({ state: 'nok', error }));

  return [promise, chan];
};

function* watchOnProgress(chan) {
  while (true) {
    const data = yield take(chan);
    if (typeof data === 'number') {
      yield put(fileUploadProgressAction(data));
    } else if (data.state === 'ok') {
      yield put(fileUploadSuccessAction(data.response.data));
    } else {
      yield put(fileUploadFailAction(data.error.response));
    }
  }
}

function* uploadVideo({ file }) {
  try {
    const [promise, chan] = createAsyncUpload(file);
    yield fork(watchOnProgress, chan);
    yield call(identity(promise));
  } catch (error) {
    yield put(fileUploadFailAction(error));
  }
}

function* uploadBanner({ file }) {
  try {
    const response = yield call(uploadBannerApi, file);
    yield put(uploadBannerSuccessAction(response.data));
  } catch (error) {
    yield put(uploadBannerFailAction(error));
  }
}

function* createVideo({ params }) {
  try {
    const response = yield call(createVideoApi, params);
    yield put(createVideoSuccessAction(response.data));
  } catch (error) {
    yield put(createVideoFailAction(error));
  }
}

function* updateVideo({ slug, params }) {
  try {
    const response = yield call(updateVideoApi, slug, params);
    yield put(updateVideoSuccessAction(response.data));
  } catch (error) {
    yield put(updateVideoFailAction(error));
  }
}

function* deleteVideo({ slug }) {
  try {
    yield call(deleteVideoApi, slug);
    yield put(deleteVideoSuccessAction());
  } catch (error) {
    yield put(deleteVideoFailAction(error));
  }
}

function* getMyVideos({ params }) {
  try {
    const response = yield call(getMyVideosApi, params);
    yield put(getMyVideosSuccessAction(response.data));
  } catch (error) {
    yield put(getMyVideosFailAction(error));
  }
}

function* getVideo({ slug }) {
  try {
    const response = yield call(getVideoApi, slug);
    yield put(getVideoSuccessAction(response.data));
  } catch (error) {
    yield put(getVideoFailAction(error));
  }
}

export function* getVideos({ params }) {
  try {
    const response = yield call(getVideosApi, params);
    yield put(getVideosSuccessAction(response.data));
  } catch (error) {
    yield put(getVideosFailAction(error));
  }
}

export function* changeVideoState({ params }) {
  try {
    const response = yield call(changeVideoStateApi, params);
    yield put(changeVideoStateSuccessAction(response.data));
    yield put(
      notificationShowAction(
        'وضعیت ویدیو تغییر کرد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(changeVideoStateFailAction(error));
    yield put(
      notificationShowAction(
        'در تغییر وضعیت ویدیو مشکل به وجود آمده است',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* getVideoStatistics({ slug, range }) {
  try {
    const response = yield call(getVideoStatisticsApi, slug, range);
    yield put(getVideoStatisticsSuccessAction(response.data));
  } catch (error) {
    yield put(getVideoStatisticsFailAction(error));
  }
}

function* likeOrDislikeVideo({ slug, like }) {
  try {
    yield call(likeOrDislikeVideoApi, slug, like);
    yield put(likeOrDislikeSuccessAction(true));
    yield put(
      notificationShowAction(
        'عملیات پسند کردن با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(
      notificationShowAction(
        'عملیات پسند کردن با خطا روبرو شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(likeOrDislikeFailAction(error));
  }
}

function* republishVideo({ slug }) {
  try {
    yield call(republishVideoApi, slug);
    yield put(republishVideoSuccessAction(true));
    yield put(
      notificationShowAction(
        'عملیات بازنشر با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(
      notificationShowAction(
        'عملیات بازنشر با خطا روبرو شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(republishVideoFailAction(error));
  }
}

function* getTags() {
  try {
    const response = yield call(getTagsApi);
    yield put(getTagsSuccessAction(response.data));
  } catch (error) {
    yield put(getTagsFailAction(error));
  }
}

function* addTag({ tag }) {
  if (tag) {
    try {
      const response = yield call(addTagApi, tag);
      yield put(addTagSuccessAction(response.data));
      const { data } = yield select(makeSelectTags());
      data.push({ ...response.data, isNew: true });
      yield put(getTagsSuccessAction(data));
    } catch (error) {
      yield put(addTagFailAction(error));
    }
  }
}

function* getCategories() {
  try {
    const response = yield call(getCategoriesApi);
    yield put(getCategoriesSuccessAction(response.data));
  } catch (error) {
    yield put(getCategoriesFailAction(error));
  }
}

function* getMyCategories({ withVideoCount }) {
  try {
    const response = yield call(getMyCategoriesApi, withVideoCount);
    yield put(getMyCategoriesSuccessAction(response.data));
  } catch (error) {
    yield put(getMyCategoriesFailAction(error));
  }
}

function* addCategory({ title }) {
  if (title) {
    try {
      const response = yield call(addCategoryApi, title);
      yield put(addCategorySuccessAction(response.data));
      yield put(
        notificationShowAction(
          'دسته بندی با موفقیت ثبت شد',
          NOTIFICATION_TYPE_SUCCESS,
        ),
      );
    } catch (error) {
      yield put(addCategoryFailAction(error));
      yield put(
        notificationShowAction(
          'ثبت دسته بندی با مشکل مواجه شد',
          NOTIFICATION_TYPE_ERROR,
        ),
      );
    }
  }
}

function* editCategory({ id, title }) {
  if (title) {
    try {
      const response = yield call(editCategoryApi, id, title);
      yield put(editCategorySuccessAction(response.data));
      yield put(
        notificationShowAction(
          'دسته بندی با موفقیت ویرایش شد',
          NOTIFICATION_TYPE_SUCCESS,
        ),
      );
    } catch (error) {
      yield put(editCategoryFailAction(error));
      yield put(
        notificationShowAction(
          'ثبت دسته بندی با مشکل مواجه شد',
          NOTIFICATION_TYPE_ERROR,
        ),
      );
    }
  }
}

function* getPlaylists() {
  try {
    const response = yield call(getPlaylistsApi);
    yield put(getPlayListsSuccessAction(response.data));
  } catch (error) {
    yield put(getPlayListsFailAction(error));
  }
}

function* getPlaylist({ id }) {
  try {
    const response = yield call(getPlaylistApi, id);
    yield put(getPlayListSuccessAction(response.data));
  } catch (error) {
    yield put(
      notificationShowAction(
        'در دریافت اطلاعات playlist خطایی رخ داد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(getPlayListFailAction(error));
  }
}

function* addPlaylist({ title }) {
  if (title) {
    try {
      const response = yield call(addPlaylistApi, title);
      yield put(addPlayListSuccessAction(response.data));
      const playlists = yield select(makeSelectPlaylists());
      playlists.push(response.data);
      yield put(getPlayListsSuccessAction(playlists));
    } catch (error) {
      yield put(addCategoryFailAction(error));
    }
  }
}

function* unfollowChannel({ name }) {
  try {
    yield call(unfollowApi, name);
    yield put(unfollowSuccessAction());
    yield put(
      notificationShowAction(
        'دنبال کردن کانال با موفقیت لغو شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    console.dir(error);
    yield put(unfollowFailAction(error));
    yield put(
      notificationShowAction(
        'لغو دنبال کردن کانال با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* followChannel({ name }) {
  try {
    yield call(followApi, name);
    yield put(followSuccessAction());

    yield put(
      notificationShowAction(
        'کانال با موفقیت دنبال شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(
      notificationShowAction(
        'دنبال کردن کانال با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(followFailAction(error));
  }
}

function* getFollowingList() {
  try {
    const { data: followingsResponse } = yield call(followingListApi);
    const { data: followersResponse } = yield call(followerListApi);
    const result = [
      ...followingsResponse.map(item => ({
        type: FOLLOW_TYPE_FOLLOWINGS,
        ...item,
      })),
      ...followersResponse.map(item => ({
        type: FOLLOW_TYPE_FOLLOWERS,
        ...item,
        followed:
          followingsResponse.filter(currentItem => currentItem.id === item.id)
            .length > 0,
      })),
    ];

    yield put(getFollowingListSuccessAction(result));
  } catch (error) {
    yield put(getFollowingListFailAction(error));
  }
}

function* getCommentList() {
  try {
    const response = yield call(getCommetnListApi);
    yield put(getCommentListSuccessAction(response.data));
  } catch (error) {
    yield put(getCommentListFailAction(error));
  }
}

function* postComment({ params }) {
  try {
    const response = yield call(postCommentApi, params);
    yield getCommentList();
    yield put(postCommentSuccessAction(response.data));
    yield put(
      notificationShowAction(
        'نظر شما با موفقیت ثبت شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(postCommentFailAction(error));
    yield put(
      notificationShowAction(
        'در ثبت نظر مشکلی به وجود آمده است',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* removeComment({ id }) {
  try {
    const response = yield call(removeCommentApi, id);
    yield put(removeCommentSuccessAction(response.data));
    yield put(
      notificationShowAction('نظر با موفقیت حذف شد', NOTIFICATION_TYPE_SUCCESS),
    );
  } catch (error) {
    yield put(removeCommentFailAction(error));
    yield put(
      notificationShowAction(
        'در حذف نظر مشکلی به وجود آمده است',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* acceptComment({ id }) {
  try {
    const response = yield call(
      changeCommentStateApi,
      id,
      COMMENT_STATE_ACCEPTED,
    );
    yield put(acceptCommentSuccessAction(response.data));
    yield put(
      notificationShowAction(
        'نظر با موفقیت تایید شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(acceptCommentFailAction(error));
    yield put(
      notificationShowAction(
        'در تایید نظر مشکلی به وجود آمده است',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* getChannelStatistics({ range }) {
  try {
    const response = yield call(getChannelStatisticsApi, range);
    yield put(getChannelStatisticsSuccessAction(response.data));
  } catch (error) {
    yield put(getVideoStatisticsFailAction(error));
  }
}

function* getChannelInfo({ name }) {
  try {
    const response = yield call(getChannelInfoApi, name);
    yield put(getChannelInfoSuccessAction(response.data));
  } catch (error) {
    yield put(getChannelInfoFailAction(error));
  }
}

function* updateChannelInfo({ params }) {
  try {
    const response = yield call(updateChannelInfoApi, params);
    yield put(updateChannelInfoSuccessAction(response.data));

    const authData = getAuth();
    authData.me.website = params.website;
    authData.me.channel.name = params.name;
    authData.me.channel.info = params.info;
    setAuth(authData);

    yield put(
      notificationShowAction(
        'کانال با موفقیت به روز رسانی شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(updateChannelInfoFailAction(error));
    yield put(
      notificationShowAction(
        'به روز رسانی کانال با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* updateChannelSocials({ params }) {
  try {
    const response = yield call(updateChannelSocialsApi, params);
    yield put(updateChannelSocialsSuccessAction(response.data));

    const authData = getAuth();
    authData.me.channel.socials = params;
    setAuth(authData);

    yield put(
      notificationShowAction(
        'به روز رسانی شبکه های اجتماعی با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(updateChannelSocialsFailAction(error));
    yield put(
      notificationShowAction(
        'به روز رسانی شبکه های اجتماعی با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* updateChannelUserInfo({ params }) {
  try {
    const response = yield call(updateChannelUserInfoApi, params);
    yield put(updateChannelUserInfoSuccessAction(response.data));

    const isPassword = 'password' in params;

    yield put(
      notificationShowAction(
        isPassword
          ? 'گذر واژه با موفقیت تغییر یافت'
          : 'کد تایید برای شما ارسال شد لطفا آن را در کادر مربوطه وارد کنید',
        isPassword ? NOTIFICATION_TYPE_SUCCESS : NOTIFICATION_TYPE_INFO,
      ),
    );
  } catch (error) {
    yield put(updateChannelUserInfoFailAction(error));
    yield put(
      notificationShowAction(
        'به روز رسانی اطلاعات با مشکل مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* updateChannelUserInfoConfirm({ code }) {
  try {
    const response = yield call(updateChannelUserInfoConfirmApi, code);
    yield put(updateChannelUserInfoConfirmSuccessAction(response.data));

    const authData = getAuth();
    authData.me = { ...authData.me, ...response.data };
    setAuth(authData);

    yield put(
      notificationShowAction(
        'به روز رسانی اطلاعات کاربری انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(updateChannelUserInfoConfirmFailAction(error));
    yield put(
      notificationShowAction(
        error.message || 'به روز رسانی اطلاعات کاربری با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

function* uploadChannelBanner({ file }) {
  try {
    const response = yield call(uploadChannelBannerApi, file);
    yield put(uploadChannelBannerSuccessAction(response.data));

    const authData = getAuth();
    authData.me.avatar = response.data.banner;
    setAuth(authData);
  } catch (error) {
    yield put(uploadChannelBannerFailAction(error));
  }
}

export function* getUserMe() {
  try {
    const response = yield call(getUserMeApi);
    yield put(getUserMeSuccessAction(response.data));
  } catch (error) {
    yield put(getUserMeFailAction(error));
  }
}

export function* getUsers({ params }) {
  try {
    const response = yield call(getUsersApi, params);
    yield put(getUsersSuccessAction(response.data));
  } catch (error) {
    yield put(getUsersFailAction(error));
  }
}

export function* updateUsers({ params }) {
  try {
    const response = yield call(updateUserApi, params);
    yield put(updateUserSuccessAction(response.data));

    yield put(
      notificationShowAction(
        'به روز رسانی اطلاعات کاربری با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(
      notificationShowAction(
        'به روز رسانی اطلاعات کاربری با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(updateUserFailAction(error));
  }
}

export function* resetUserPassword({ params }) {
  try {
    const response = yield call(resetUserPasswordApi, params);
    yield put(resetUserPasswordSuccessAction(response.data));

    yield put(
      notificationShowAction(
        'بازنشانی گذر واژه با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(
      notificationShowAction(
        'بازنشانی گذر واژه با مشکل مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
    yield put(resetUserPasswordFailAction(error));
  }
}

export function* unregisterUser() {
  try {
    yield call(unregisterUserApi);
    setAuth();
    yield put(push(ROUTE_LOGIN));
    yield put(logoutSuccessAction());
  } catch (error) {
    yield put(unregisterUserFailAction(error));
  }
}

export function* deleteUser({ params }) {
  try {
    yield call(deleteUserApi, params);
    yield put(deleteUserSuccessAction(true));
    yield put(
      notificationShowAction(
        'حذف کاربر با موفقیت انجام شد',
        NOTIFICATION_TYPE_SUCCESS,
      ),
    );
  } catch (error) {
    yield put(deleteUserFailAction(error));
    yield put(
      notificationShowAction(
        'حذف کاربر با خطا مواجه شد',
        NOTIFICATION_TYPE_ERROR,
      ),
    );
  }
}

export function* logout() {
  try {
    yield call(logoutApi);
    setAuth();
    yield put(push(ROUTE_LOGIN));
    yield put(logoutSuccessAction());
  } catch (error) {
    yield put(logoutFailAction(error));
  }
}

function* getCategorizedVideos({ params }) {
  try {
    const response = yield call(getCategorizedVideosApi, params);

    yield put(getCategorizedVideosSuccessAction(response.data));
  } catch (error) {
    yield put(getCategorizedVideosFailAction(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(FILE_UPLOAD, uploadVideo);
  yield takeLatest(BANNER_UPLOAD, uploadBanner);
  yield takeLatest(CREATE_VIDEO, createVideo);
  yield takeLatest(UPDATE_VIDEO, updateVideo);
  yield takeLatest(DELETE_VIDEO, deleteVideo);
  yield takeLatest(LIST_MY_VIDEOS, getMyVideos);
  yield takeLatest(GET_VIDEO, getVideo);
  yield takeLatest(GET_VIDEOS, getVideos);
  yield takeLatest(CHANGE_VIDEO_STATE, changeVideoState);
  yield takeLatest(GET_VIDEO_STATISTICS, getVideoStatistics);

  yield takeLatest(GET_TAGS, getTags);
  yield takeLatest(ADD_TAG, addTag);

  yield takeLatest(GET_CATEGORIES, getCategories);
  yield takeLatest(GET_MY_CATEGORIES, getMyCategories);
  yield takeLatest(ADD_CATEGORY, addCategory);
  yield takeLatest(EDIT_CATEGORY, editCategory);

  yield takeLatest(GET_PLAYLISTS, getPlaylists);
  yield takeLatest(GET_PLAYLIST, getPlaylist);
  yield takeLatest(ADD_PLAYLIST, addPlaylist);

  yield takeLatest(UNFOLLOW_CHANNEL, unfollowChannel);
  yield takeLatest(FOLLOW_CHANNEL, followChannel);
  yield takeLatest(GET_FOLLOWING_LIST, getFollowingList);

  yield takeLatest(GET_COMMENT_LIST, getCommentList);
  yield takeLatest(POST_COMMENT, postComment);
  yield takeLatest(REMOVE_COMMENT, removeComment);
  yield takeLatest(ACCEPT_COMMENT, acceptComment);

  yield takeLatest(GET_CHANNEL_STATISTICS, getChannelStatistics);
  yield takeLatest(GET_CHANNEL_INFO, getChannelInfo);
  yield takeLatest(UPDATE_CHANNEL_INFO, updateChannelInfo);
  yield takeLatest(UPDATE_CHANNEL_SOCIALS, updateChannelSocials);
  yield takeLatest(UPDATE_CHANNEL_USERINFO, updateChannelUserInfo);
  yield takeLatest(
    UPDATE_CHANNEL_USERINFO_CONFIRM,
    updateChannelUserInfoConfirm,
  );
  yield takeLatest(CHANNEL_BANNER_UPLOAD, uploadChannelBanner);

  yield takeLatest(GET_USER_ME, getUserMe);
  yield takeLatest(GET_USERS, getUsers);
  yield takeLatest(UPDATE_USER, updateUsers);
  yield takeLatest(RESET_USER_PASSWORD, resetUserPassword);
  yield takeLatest(DELETE_USER, deleteUser);
  yield takeLatest(UNREGISTER_USER, unregisterUser);
  yield takeLatest(LOGOUT_ACTION, logout);

  yield takeLatest(GET_CATEGORIZED_VIDEOS, getCategorizedVideos);
  yield takeLatest(LIKE_OR_DISLIKE_VIDEO, likeOrDislikeVideo);
  yield takeLatest(REPUBLISH_VIDEO, republishVideo);
}
