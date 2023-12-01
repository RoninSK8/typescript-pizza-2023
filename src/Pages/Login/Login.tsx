import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

function Login() {
	const [error, setError] = useState<string | null>();
	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/login`, {
				email,
				password,
			});
			console.log(data);
		} catch (e) {
			if (e instanceof AxiosError) {
				console.log(e);
				setError(e.response?.data.message);
			}
		}
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	return (
		<div className={styles['login']}>
			<Header>Вход</Header>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш Email</label>
					<Input id="email" name="email" placeholder="Email"></Input>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						name="password"
						placeholder="Пароль"
						type="password"
					></Input>
				</div>

				<Button appearence="big">ВХОД</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}

export default Login;
