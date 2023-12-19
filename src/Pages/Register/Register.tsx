import { Link, useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, userActions } from '../../store/user.slice';
import { AppDispatch, RootState } from '../../store/store';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendRegister = async (
		email: string,
		password: string,
		name: string
	) => {
		dispatch(register({ email, password, name }));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		await sendRegister(email.value, password.value, name.value);
	};

	return (
		<div className={styles['login']}>
			<Header>Регистрация</Header>
			{registerErrorMessage && (
				<div className={styles['error']}>{registerErrorMessage}</div>
			)}
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
				<div className={styles['field']}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name="name" placeholder="Имя"></Input>
				</div>

				<Button appearence="big">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
			</form>
			<div className={styles['links']}>
				<div>Есть аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	);
}

export default Register;
