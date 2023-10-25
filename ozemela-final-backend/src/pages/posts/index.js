import { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Skeleton, Stack } from '@chakra-ui/react';
import { FaCircleArrowUp, FaCircleArrowDown } from 'react-icons/fa6';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';

import Button from '../../components/button';
import Line from '../../components/line';
import AutoExpandTextArea from '../../components/expandTextArea';
import { AuthContext } from '../../contexts/authorization';
import {
  createPost,
  deletePost,
  editPost,
  getLoggedUser,
  getPosts,
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
import { GlobalContext } from '../../contexts/GlobalContext';
import { goToComments } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const context = useContext(GlobalContext);
  const { userId, setUserId, userRole, setUserRole } = context;

  const [contentPost, setContentPost] = useState('');
  const [editContentPost, setEditContentPost] = useState('');
  const [postsData, setPostsData] = useState([]);
  const [upvoteColors, setUpvoteColors] = useState({});
  const [downvoteColors, setDownvoteColors] = useState({});
  const [editPostId, setEditPostId] = useState(null);

  const authContext = useContext(AuthContext);
  const { loading, setLoading } = authContext;

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const result = await getPosts(token);

        if (!result) return;

        // Converter os valores de updatedAt em um formato ISO 8601 válido
        result.forEach((post) => {
          // Suponha que updatedAt seja uma string no formato "yyyy-mm-dd hh:mm:ss"
          const isoDate = post.updatedAt
            .replace(' ', 'T')
            .replace(/ /g, '')
            .concat('Z');

          post.updatedAt = isoDate;
        });

        // Ordenar os posts com base na data de atualização (do mais recente para o mais antigo)
        result.sort((a, b) => {
          const dateA = DateTime.fromISO(a.updatedAt, { zone: 'utc' });
          const dateB = DateTime.fromISO(b.updatedAt, { zone: 'utc' });

          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          return 0;
        });

        setPostsData(result);
        setLoading(false);
      };

      fetchData();

      const getUser = async () => {
        const result = await getLoggedUser(token);

        setUserId(result.data.id);
        setUserRole(result.data.role);
      };

      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createPost(contentPost, token);

    if (!result) return;

    setLoading(true);

    setPostsData((prevPostsData) => [...prevPostsData, result]);
    setContentPost('');
  };

  const handleLike = async (like, id) => {
    const result = await likeDislikePost(like, id, token);

    if (!result) return;

    // Atualize o estado local com os dados atualizados do post
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

    // Determine a cor atual do botão de upvote
    const currentUpvoteColor = upvoteColors[id];

    // Determine a cor atual do botão de downvote
    const currentDownvoteColor = downvoteColors[id];

    // Atualize o estado local para definir a cor do botão de upvote
    setUpvoteColors((prevUpvoteColors) => ({
      ...prevUpvoteColors,
      [id]: currentUpvoteColor === 'green' ? 'black' : 'green',
    }));

    // Atualize o estado local para definir a cor do botão de downvote
    setDownvoteColors((prevDownvoteColors) => ({
      ...prevDownvoteColors,
      [id]: currentDownvoteColor === 'red' ? 'black' : 'red',
    }));

    // Atualize o estado local com os dados atualizados do post
    setPostsData(updatedPostsData);
  };

  const handleEdit = async (id) => {
    const result = await editPost(editContentPost, token, id);

    if (!result) return;

    setLoading(true);
    setEditContentPost('');
    setEditPostId(null);
  };

  const handleDelete = async (post) => {
    const result = await deletePost(post.id, token);

    if (!result) return;

    setLoading(true);
  };

  const toUpperCase = (string) => {
    return string[0].toUpperCase() + string.substr(1);
  };

  return (
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
          placeholder="Escreva seu post..."
          h="150px"
          borderRadius="10px"
          value={contentPost}
          onChange={(e) => setContentPost(e.target.value)}
        />

        <Button value={'Postar'} />
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
          postsData.map((post) => {
            const isOwner = post.creator.id === userId;

            return (
              <StackStyled key={post.id} spacing="18px">
                <div className="top">
                  <p>Enviado por: {toUpperCase(post.creator.name)}</p>

                  {(isOwner || userRole === 'ADMIN') && (
                    <AiFillDelete
                      size={20}
                      onClick={() => handleDelete(post)}
                    />
                  )}
                </div>

                <p>{post.content}</p>

                <div className="bottom">
                  <div className="left">
                    <FaCircleArrowUp
                      size={'20'}
                      color={upvoteColors[post.id] || 'black'}
                      onClick={() => handleLike(true, post.id)}
                    />

                    <p>{post.likes - post.dislikes}</p>

                    <FaCircleArrowDown
                      size={'20'}
                      color={downvoteColors[post.id] || 'black'}
                      onClick={() => handleLike(false, post.id)}
                    />
                  </div>

                  <div className="middle">
                    <figure onClick={() => goToComments(navigate, post.id)}>
                      <img src={comment} alt="Ícone de comentário" />
                    </figure>

                    <p>{post.amountComment}</p>
                  </div>

                  {isOwner && (
                    <div className="right">
                      <AiFillEdit
                        size={25}
                        onClick={() =>
                          setEditPostId((prevEditPostId) =>
                            prevEditPostId === post.id ? null : post.id,
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                {editPostId === post.id && (
                  <EditPostArea>
                    <AutoExpandTextArea
                      value={editContentPost}
                      change={setEditContentPost}
                    />
                    <IoSend size={20} onClick={() => handleEdit(post.id)} />
                  </EditPostArea>
                )}
              </StackStyled>
            );
          })
        )}
      </Stack>
    </Container>
  );
};

export default Posts;