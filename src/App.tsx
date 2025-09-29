import { useState, useEffect } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!domNode) return;

		const style = domNode.style;

		style.setProperty(
			'--font-family',
			articleState.fontFamilyOption?.value || ''
		);
		style.setProperty('--font-size', articleState.fontSizeOption?.value || '');
		style.setProperty('--font-color', articleState.fontColor?.value || '');
		style.setProperty(
			'--container-width',
			articleState.contentWidth?.value || ''
		);
		style.setProperty('--bg-color', articleState.backgroundColor?.value || '');
	}, [articleState]);

	return (
		<main className={styles.main}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
