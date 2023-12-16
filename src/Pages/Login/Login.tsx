import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../store/user.slice';
import { AppDispatch, RootState } from '../../store/store';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));

		// ** Without async thunk

		// try {
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
		// 		email,
		// 		password,
		// 	});
		// 	dispatch(userActions.addJwt(data.access_token));
		// 	navigate('/');
		// } catch (e) {
		// 	if (e instanceof AxiosError) {
		// 		console.log(e);
		// 		setError(e.response?.data.message);
		// 	}
		// }
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	return (
		<div className={styles['login']}>
			<Header>Вход</Header>
			{loginErrorMessage && (
				<div className={styles['error']}>{loginErrorMessage}</div>
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
