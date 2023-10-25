import { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Skeleton, Stack } from '@chakra-ui/react';
import { FaCircleArrowUp, FaCircleArrowDown } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';

import Button from '../../components/button';
import Line from '../../components/line';
import AutoExpandTextArea from '../../components/expandTextArea';
import { AuthContext } from '../../contexts/authorization';
import {
  editPost,
  getAllCommentsPost,
  getPosts,
  insertCommentPost,
  likeDislikePost,
} from '../../services/api';

import {
  Container,
  EditPostArea,
  Form,
  StackStyled,
  TextareaStyled,
} from './styled';

import comment from '../../assets/comentario_icon.png';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const [contentPost, setContentPost] = useState('');
  const [editContentPost, setEditContentPost] = useState('');
  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [upvoteColors, setUpvoteColors] = useState({});
  const [downvoteColors, setDownvoteColors] = useState({});
  const [editPostId, setEditPostId] = useState(null);

  const authContext = useContext(AuthContext);
  const { loading, setLoading } = authContext;

  const { id } = useParams();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const result = await getPosts(token);

        if (!result) return;

        
        result.forEach((post) => {
         
          const isoDate = post.updatedAt
            .replace(' ', 'T')
            .replace(/ /g, '')
            .concat('Z');

          post.updatedAt = isoDate;
        });

        
        result.sort((a, b) => {
          const dateA = DateTime.fromISO(a.updatedAt, { zone: 'utc' });
          const dateB = DateTime.fromISO(b.updatedAt, { zone: 'utc' });

          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          return 0;
        });

        setPostsData(result);

        const comments = await getAllCommentsPost(id, token);

        if (!comments) return;

        comments.forEach((comment) => {
          const isoDate = comment.updatedAt
            .replace(' ', 'T')
            .replace(/ /g, '')
            .concat('Z');

          comment.updatedAt = isoDate;
        });

        comments.sort((a, b) => {
          const dateA = DateTime.fromISO(a.updatedAt, { zone: 'utc' });
          const dateB = DateTime.fromISO(b.updatedAt, { zone: 'utc' });

          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          return 0;
        });

        setCommentsData(comments);
        setLoading(false);
      };

      fetchData();
    }
    
  }, [loading]);

  const postToComment = postsData.find((post) => post.id === id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await insertCommentPost(id, token, contentPost);

    if (!result) return;

    setLoading(true);

    setCommentsData((prevCommentsData) => [...prevCommentsData, result]);
    setContentPost('');
  };

  const handleLike = async (like, id) => {
    const result = await likeDislikePost(like, id, token);

    if (!result) return;

   
    const updatedPostsData = postsData.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: result.likes,
          dislikes: result.dislikes,
        };
      }
      return post;
    });

    
    const currentUpvoteColor = upvoteColors[id];

   
    const currentDownvoteColor = downvoteColors[id];

    
    setUpvoteColors((prevUpvoteColors) => ({
      ...prevUpvoteColors,
      [id]: currentUpvoteColor === 'green' ? 'black' : 'green',
    }));

   
    setDownvoteColors((prevDownvoteColors) => ({
      ...prevDownvoteColors,
      [id]: currentDownvoteColor === 'red' ? 'black' : 'red',
    }));

  
    setPostsData(updatedPostsData);
  };

  const handleEdit = async (id) => {
    const result = await editPost(editContentPost, token, id);

    if (!result) return;

    setLoading(true);
    setEditContentPost('');
    setEditPostId(null);
  };

  const toUpperCase = (string) => {
    return string[0].toUpperCase() + string.substr(1);
  };

  return (
    <>
      {postToComment && (
        <Container
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '-2.5rem' }}
        >
          <StackStyled key={postToComment.id} spacing="18px">
            <div className="top">
              <p>Enviado por: {toUpperCase(postToComment.creator.name)}</p>
            </div>

            <p>{postToComment.content}</p>

            <div className="bottom">
              <div className="left">
                <FaCircleArrowUp
                  size={'20'}
                  color={upvoteColors[postToComment.id] || 'black'}
                  onClick={() => handleLike(true, postToComment.id)}
                />

                <p>{postToComment.likes - postToComment.dislikes}</p>

                <FaCircleArrowDown
                  size={'20'}
                  color={downvoteColors[postToComment.id] || 'black'}
                  onClick={() => handleLike(false, postToComment.id)}
                />
              </div>

              <div className="middle">
                <figure>
                  <img src={comment} alt="Ícone de comentário" />
                </figure>

                <p>{postToComment.amountComment}</p>
              </div>

              {editPostId === postToComment.id && (
                <EditPostArea>
                  <AutoExpandTextArea
                    value={editContentPost}
                    change={setEditContentPost}
                  />
                  <IoSend
                    size={20}
                    onClick={() => handleEdit(postToComment.id)}
                  />
                </EditPostArea>
              )}
            </div>
          </StackStyled>
        </Container>
      )}

      <Container
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
      >
        <Form onSubmit={(e) => handleSubmit(e)}>
          <TextareaStyled
            variant="filled"
            resize={'none'}
            placeholder="Adicionar comentário"
            h="150px"
            borderRadius="10px"
            value={contentPost}
            onChange={(e) => setContentPost(e.target.value)}
          />

          <Button value={'Responder'} />
        </Form>

        <Line />

        <Stack mt="2rem" spacing="1rem">
          {loading ? (
            <>
              <Skeleton height="150px" borderRadius="5px" />
              <Skeleton height="150px" borderRadius="5px" />
              <Skeleton height="150px" borderRadius="5px" />
            </>
          ) : (
            commentsData.map((comment) => {
              return (
                <StackStyled key={comment.id} spacing="18px">
                  <div className="top">
                    <p>Enviado por: {toUpperCase(comment.creator.name)}</p>
                  </div>

                  <p>{comment.content}</p>

                  <div className="bottom">
                    <div className="left">
                      <FaCircleArrowUp
                        size={'20'}
                        color={upvoteColors[comment.id] || 'black'}
                        onClick={() => handleLike(true, comment.id)}
                      />

                      <p>{comment.likes - comment.dislikes}</p>

                      <FaCircleArrowDown
                        size={'20'}
                        color={downvoteColors[comment.id] || 'black'}
                        onClick={() => handleLike(false, comment.id)}
                      />
                    </div>
                  </div>

                  {editPostId === comment.id && (
                    <EditPostArea>
                      <AutoExpandTextArea
                        value={editContentPost}
                        change={setEditContentPost}
                      />
                      <IoSend
                        size={20}
                        onClick={() => handleEdit(comment.id)}
                      />
                    </EditPostArea>
                  )}
                </StackStyled>
              );
            })
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Comments;