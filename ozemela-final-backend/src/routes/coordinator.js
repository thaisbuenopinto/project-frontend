export const goToHome = (navigate) => {
    navigate('/');
  };
  
  export const goToSignUp = (navigate) => {
    navigate('/signup');
  };
  
  export const goToPosts = (navigate) => {
    navigate('/posts');
  };
  
  export const goToComments = (navigate, id) => {
    navigate(`/posts/comments/${id}`);
  };