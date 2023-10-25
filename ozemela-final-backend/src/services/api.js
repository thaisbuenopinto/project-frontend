import axios from 'axios';
import Swal from 'sweetalert2';

export const api = axios.create({
  baseURL: 'https://proj-backend-onny.onrender.com'
});

export const createNewUser = async (name, email, password) => {
  const body = { name, email, password };

  const result = await api
    .post(`/users/signup`, body)
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 400 || error.response.status === 500) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const createSession = async (email, password) => {
  const body = {
    email,
    password,
  };

  const result = await api
    .post('/users/login', body)
    .then((response) => response)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const getLoggedUser = async (token) => {
  const result = await api
    .get(`/users`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const createPost = async (content, token) => {
  const body = { content };

  const result = await api
    .post(`/posts`, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const getPosts = async (token) => {
  const result = await api
    .get(`/posts`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error('Erro na requisição:', error));

  return result;
};

export const likeDislikePost = async (like, id, token) => {
  const body = { like };

  const result = await api
    .put(`/posts/${id}/like`, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const editPost = async (content, token, id) => {
  const body = { content };

  const result = await api
    .put(`/posts/${id}`, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const deletePost = async (id, token) => {
  const result = await api
    .delete(`/posts/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const getAllCommentsPost = async (id, token) => {
  const result = await api
    .get(`/posts/comment/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};

export const insertCommentPost = async (id, token, content) => {
  const body = { content };

  const result = await api
    .post(`/posts/comment/${id}`, body, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response)
    .catch((error) => {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        Swal.fire({
          text: `${error.response.data[0].message || error.response.data}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  return result;
};