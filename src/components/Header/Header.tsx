import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

function Header({ children, className, ...props }: HeaderProps) {
	return (
		<h1 {...props} className={cn(className, styles['h1'])}>
			{children}
		</h1>
	);
}

export default Header;
