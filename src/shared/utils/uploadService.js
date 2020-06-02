import { toggleSingleUploading } from 'shared/redux/app/reducer';
import { createSelector } from 'redux-starter-kit';
import axios from './axios';
import store from '../redux/store';

export const isUploadingSelector = createSelector(
  state => state.app.isSingleUploading,
  e => e,
);


export default async function uploadService(file, params = {}, url = '/file/upload/simple') {
  const formData = new FormData();
  Object.entries(params)
    .forEach(([key, val]) => formData.append(key, val));

  store.dispatch(toggleSingleUploading());
  formData.append('file', file);

  return axios({
    data: formData,
    url,
    method: 'POST',
  }).finally(() => {
    store.dispatch(toggleSingleUploading());
  });
}
