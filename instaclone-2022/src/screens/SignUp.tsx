import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authService, faceBookLogin, dbService, storageService } from '../fbase';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/Auth/AuthLayout';
import TopBox from '../components/Auth/TopBox';
import { Input, Submit } from '../components/Auth/Input';
import BottomBox, { BottomLink } from '../components/Auth/BottomBox';
import Separator from '../components/Auth/Separator';
import FormError from '../components/Auth/FormError';

const JoinMessage = styled.div`
  opacity: 0.5;
  font-weight: 600;
  text-align: center;
  width: 100%;
  font-size: 17px;
`;
const FBLogin = styled.button`
  all: unset;
  cursor: pointer;
  margin-top: 20px;
  color: white;
  width: 100%;
  height: 35px;
  text-align: center;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) => props.theme.authBtnColor};
`;
interface IForm {
  email: string;
  name: string;
  username: string;
  password: string;
}
//createUserWithEmailAndPassword
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const history = useHistory();
  const onSocialLogin = () => {
    try {
      faceBookLogin();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const { email, password, name, username } = data;
    const user = {
      email,
      password,
      name,
      username,
      phoneNumber: '',
      gender: '',
      meta: {
        numOfposts: 0,
        follower: 0,
        follwing: 0,
      },
    };
    console.log(email, password);
    console.log(user);
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      console.log('계정 생성됨');
      await dbService.collection('users').doc(authService.currentUser?.uid).set(user);
      console.log('lalal');
      history.push('/', { message: 'Account created. Please log in.', email, password });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <TopBox>
        <Link to="/">
          <img alt="logo" src="img/instagram_logo.png" />
        </Link>
        <JoinMessage>
          <span>
            친구들의 사진과 동영상을 보려면
            <br /> 가입하세요.
          </span>
        </JoinMessage>
        <FBLogin onClick={onSocialLogin}>
          {' '}
          <FontAwesomeIcon icon={faFacebookSquare} /> Facebook으로 로그인
        </FBLogin>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormError message={errors?.email?.message} />
          <Input
            {...register('email', { required: '이메일을 입력해 주세요' })}
            hasError={Boolean(errors?.email?.message)}
            placeholder="이메일"
            type="email"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register('name', { required: '이름을 입력해 주세요' })}
            hasError={Boolean(errors?.name?.message)}
            placeholder="성명"
            type="text"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('username', { required: '사용자 이름을 입력해 주세요' })}
            hasError={Boolean(errors?.username?.message)}
            placeholder="사용자 이름"
            type="text"
          />
          <FormError message={errors?.password?.message} />
          <Input
            {...register('password', {
              required: '비밀번호를 입력해 주세요',
              minLength: {
                value: 6,
                message: '비밀번호는 6자 이상이어야 합니다',
              },
            })}
            hasError={Boolean(errors?.password?.message)}
            placeholder="비밀번호"
            type="password"
          />
          <Submit type="submit" value="가입" />
        </form>
      </TopBox>
      <BottomBox>
        <span>
          계정이 있으신가요? <BottomLink to="/">로그인</BottomLink>
        </span>
      </BottomBox>
    </AuthLayout>
  );
}

export default SignUp;
