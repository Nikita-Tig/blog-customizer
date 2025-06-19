import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import usePersistState from './ui/select/hooks/usePersistState';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = usePersistState(
		defaultArticleState,
		'articleState'
	);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--bg-color': articleState.backgroundColor.value,
					'--container-width': articleState.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setArticle={setArticleState}
				currentState={articleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
