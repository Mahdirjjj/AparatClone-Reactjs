import { createSelector } from 'reselect';

const selectApp = state => state.app;
const selectRouter = state => state.router;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const makeSelectApp = () =>
  createSelector(
    selectApp,
    appState => appState,
  );

export const makeSelectError = () =>
  createSelector(
    selectApp,
    appState => appState && appState.error,
  );

export const makeSelectDrawerIsOpen = () =>
  createSelector(
    selectApp,
    appState => appState && appState.drawerIsOpen,
  );

export const makeSelectNotification = () =>
  createSelector(
    selectApp,
    appState => appState.notification,
  );

export const makeSelectBannerUpload = () =>
  createSelector(
    selectApp,
    appState => appState.bannerUpload,
  );

export const makeSelectFileUpload = () =>
  createSelector(
    selectApp,
    appState => appState.fileUpload,
  );

export const makeSelectFileUploadPercentage = () =>
  createSelector(
    selectApp,
    appState => appState.fileUpload.percent,
  );

export const makeSelectCreateVideo = () =>
  createSelector(
    selectApp,
    appState => ({
      error: appState.createVideo.error,
      data: appState.createVideo.data,
    }),
  );
export const makeSelectUpdateVideo = () =>
  createSelector(
    selectApp,
    appState => appState.updateVideo,
  );

export const makeSelectDeleteVideo = () =>
  createSelector(
    selectApp,
    appState => appState.deleteVideo,
  );

export const makeSelectMyVideos = () =>
  createSelector(
    selectApp,
    appState => ({
      error: appState.myVideos.error,
      data: appState.myVideos.data,
    }),
  );

export const makeSelectGetVideo = (convertToIds = false) =>
  createSelector(
    selectApp,
    appState => {
      if (!convertToIds) {
        return appState.getVideo;
      }

      const { data } = appState.getVideo;

      if (appState.getVideo.data) {
        if (appState.getVideo.data.tags && appState.getVideo.data.tags.length) {
          data.tags = data.tags.filter(i => i).map(item => item.id);
        }

        if (appState.getVideo.data.playlist) {
          data.playlist = data.playlist.id;
        }
      }

      return {
        ...appState.getVideo,
        data,
      };
    },
  );

export const makeSelectVideos = () =>
  createSelector(
    selectApp,
    appState => {
      if (appState.videos.data && appState.videos.data.data) {
        let categories = {};
        if (appState.categories.data) {
          categories = appState.categories.data.reduce(
            (carry, category) => ({ ...carry, [category.id]: category }),
            {},
          );
        }

        return {
          ...appState.videos,
          data: {
            ...appState.videos.data,
            data: appState.videos.data.data.map(video => ({
              ...video,
              category: categories[video.category_id],
            })),
          },
        };
      }

      return appState.videos;
    },
  );

export const makeSelectGetVideoStatistics = () =>
  createSelector(
    selectApp,
    appState => appState.getVideoStatistics,
  );

export const makeSelectChangeVideoState = () =>
  createSelector(
    selectApp,
    appState => appState.videoChangeState,
  );

export const makeSelectTags = () =>
  createSelector(
    selectApp,
    appState => appState.tags,
  );

export const makeSelectAddTag = () =>
  createSelector(
    selectApp,
    appState => appState.addTag.data,
  );

export const makeSelectCategories = () =>
  createSelector(
    selectApp,
    appState => appState.categories.data,
  );

export const makeSelectMyCategories = () =>
  createSelector(
    selectApp,
    appState => appState.myCategories,
  );

export const makeSelectAddCategory = () =>
  createSelector(
    selectApp,
    appState => appState.addCategory,
  );

export const makeSelectEditCategory = () =>
  createSelector(
    selectApp,
    appState => appState.editCategory,
  );

export const makeSelectPlaylists = () =>
  createSelector(
    selectApp,
    appState => appState.playlists.data,
  );

export const makeSelectPlaylist = () =>
  createSelector(
    selectApp,
    appState => appState.playlist,
  );

export const makeSelectAddPlaylist = () =>
  createSelector(
    selectApp,
    appState => appState.addPlaylist.data,
  );

export const makeSelectUnfollow = () =>
  createSelector(
    selectApp,
    appState => appState.unfollow,
  );

export const makeSelectFollow = () =>
  createSelector(
    selectApp,
    appState => appState.follow,
  );

export const makeSelectFollowingList = () =>
  createSelector(
    selectApp,
    appState => appState.followingList,
  );

export const makeSelectCommentList = () =>
  createSelector(
    selectApp,
    appState => {
      if (appState.commentList.data) {
        const data = appState.commentList.data
          .filter(x => x.parent_id === null)
          .reduce(
            (carry, item) => ({
              ...carry,
              [item.id]: {
                ...item,
                children: [],
              },
            }),
            {},
          );

        appState.commentList.data
          .filter(x => x.parent_id !== null)
          .forEach(item => {
            data[item.parent_id].children.push(item);
          });

        return {
          ...appState.commentList,
          data: Object.values(data),
        };
      }

      return appState.commentList;
    },
  );

export const makeSelectPostComment = () =>
  createSelector(
    selectApp,
    appState => appState.postComment,
  );

export const makeSelectRemoveComment = () =>
  createSelector(
    selectApp,
    appState => appState.removeComment,
  );

export const makeSelectAcceptComment = () =>
  createSelector(
    selectApp,
    appState => appState.acceptComment,
  );

export const makeSelectChannelStatistics = () =>
  createSelector(
    selectApp,
    appState => appState.channelStatistics,
  );

export const makeSelectChannelInfo = () =>
  createSelector(
    selectApp,
    appState => appState.channelInfo,
  );

export const makeSelectChannelInfoUpdate = () =>
  createSelector(
    selectApp,
    appState => appState.channelInfoUpdate,
  );

export const makeSelectChannelSocialsUpdate = () =>
  createSelector(
    selectApp,
    appState => appState.channelSocialsUpdate,
  );

export const makeSelectChannelUserInfoUpdate = () =>
  createSelector(
    selectApp,
    appState => appState.channelUserInfoUpdate,
  );

export const makeSelectChannelUserInfoUpdateConfirm = () =>
  createSelector(
    selectApp,
    appState => appState.channelUserInfoUpdateConfirm,
  );

export const makeSelectChannelBannerUpload = () =>
  createSelector(
    selectApp,
    appState => appState.channelBannerUpload,
  );

export const makeSelectUserMe = () =>
  createSelector(
    selectApp,
    appState => appState.userMe,
  );

export const makeSelectUnregisterUser = () =>
  createSelector(
    selectApp,
    appState => appState.unregisterUser,
  );

export const makeSelectUsers = () =>
  createSelector(
    selectApp,
    appState => appState.users,
  );

export const makeSelectDeleteUser = () =>
  createSelector(
    selectApp,
    appState => appState.deleteUser,
  );

export const makeSelectUpdateUser = () =>
  createSelector(
    selectApp,
    appState => appState.updateUser,
  );

export const makeSelectResetUserPassword = () =>
  createSelector(
    selectApp,
    appState => appState.resetUserPassword,
  );

export const makeSelectLogout = () =>
  createSelector(
    selectApp,
    appState => appState.logoutUser,
  );

export const makeSelectCategorizedVideos = () =>
  createSelector(
    selectApp,
    appState => appState.categorizedVideos,
  );

export const makeSelectLikeOrDislike = () =>
  createSelector(
    selectApp,
    appState => appState.likeOrDislikeVideo,
  );

export const makeSelectRepublishVideo = () =>
  createSelector(
    selectApp,
    appState => appState.republishVideo,
  );
