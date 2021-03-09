import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = ({ setToken }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		axios
			.post('/api/auth', data)
			.then((res) => setToken(res.data.token))
			.catch((e) => alert(e.response.data.msg));
	};

	return (
		<LoginContainer>
			<FormContainer>
				<H1>Admin login</H1>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<Label>Email: </Label>
					<input
						type="email"
						name="email"
						ref={register({
							required: 'You must specify an email',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'invalid email address',
							},
						})}
					/>
					{errors.email ? (
						<p style={{ color: 'red' }}>{errors.email.message}</p>
					) : (
						<br />
					)}
					<Label>Password: </Label>
					<input
						type="password"
						name="password"
						ref={register({
							required: 'You must specify a password',
						})}
					/>
					{errors.password ? (
						<p style={{ color: 'red' }}>
							{errors.password.message}
						</p>
					) : (
						<br />
					)}

					<Submit type="submit" />
				</Form>
			</FormContainer>
		</LoginContainer>
	);
};

const LoginContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;

const FormContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -15%;
	margin-top: -15%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #c6c6c6;
	width: 30%;
	height: 30%;
	@media screen and (max-width: 768px) {
		width: 90%;
		height: 50%;
		margin-left: -45%;
		margin-top: -45%;
	}
`;

const H1 = styled.h1`
	font-size: 2rem;
`;

const Form = styled.form`
	width: 60%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Label = styled.label`
	font-size: 1.1rem;
	padding: 5px 0 5px 0;
`;

const Submit = styled.input`
	margin: 5px 0 5px 0;
`;

export default Login;
