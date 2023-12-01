import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent } from 'react';

function Login() {
	const submit = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<div className={styles['login']}>
			<Header>Вход</Header>
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
