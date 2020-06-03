import { useState } from 'react';
import capitalize from 'lodash/capitalize';
import { useDispatch } from 'react-redux';
import {
  showSuccess,
} from 'shared/redux/app/reducer';
import axios from 'shared/utils/axios';

export default function useMutation(params) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const state = {
    loading,
    data,
    error,
  };

  return [state, mutate];
  async function mutate(params2 = {}) {
    setLoading(true);
    const allParams = { ...params, ...params2 };
    const {
      data: body,
      method = 'POST',
      onSuccess = () => {},
      message,
      hideDialog = true,
      isBase = false,
    } = allParams;
    let { url } = allParams;
    url = [url, ['delete', 'put'].includes(method.toLowerCase()) && body.id].filter(Boolean).join('/');
    url = [isBase && 'base', url].filter(Boolean).join('');
    const response = await axios({
      data: body,
      method,
      url,
    }).catch((err) => {
      setError(err);
      return null;
    });
    setLoading(false);
    if (response) {
      setData(response);
      onSuccess(response);
      if (message) {
        dispatch(showSuccess({ message, hideDialog }));
      }
    }
    return response;
  }
}

export function useCreateNode(params) {
  const { node, message = `${capitalize(node)} successfully created`, isBase = true } = params;
  return useMutation({
    message,
    method: 'POST',
    url: `/${node}`,
    isBase,
    ...params,
  });
}

export function useUpdateNode(params) {
  const { node, message = `${capitalize(node)} successfully updated`, isBase = true } = params;
  return useMutation({
    message,
    method: 'PUT',
    url: `/${node}`,
    isBase,
    ...params,
  });
}

export function useDeleteNode(params) {
  const { node, message = `${capitalize(node)} successfully deleted`, isBase = true } = params;
  return useMutation({
    message,
    method: 'DELETE',
    url: `/${node}`,
    isBase,
    ...params,
  });
}
