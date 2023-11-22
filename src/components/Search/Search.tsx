import styles from './Search.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
	{ isValid = true, className, ...props },
	ref
) {
	return (
		<div className={styles['search']}>
			<input
				ref={ref}
				className={cn(className, {
					[styles['input']]: isValid,
				})}
				{...props}
			></input>
			<img
				className={styles['icon']}
				src="/search-icon.svg"
				alt="Иконка лупы"
			/>
		</div>
	);
});

export default Search;
