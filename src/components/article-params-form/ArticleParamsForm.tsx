import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = (props: {
	setArticle: (arg: ArticleStateType) => void;
	currentState: ArticleStateType;
	onClose?: () => void;
}) => {
	const { setArticle, currentState, onClose } = props;
	const rootRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [font, setFont] = useState<OptionType>(currentState.fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(
		currentState.fontSizeOption
	);
	const [color, setColor] = useState<OptionType>(currentState.fontColor);
	const [bgColor, setBgColor] = useState<OptionType>(
		currentState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		currentState.contentWidth
	);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form className={styles.form}>
					<Select
						options={fontFamilyOptions}
						selected={font}
						title='Шрифт'
						onChange={(option) => setFont(option)}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						onChange={(option) => setFontSize(option)}
					/>
					<Select
						options={fontColors}
						selected={color}
						title='Цвет шрифта'
						onChange={(option) => setColor(option)}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={bgColor}
						title='Цвет фона'
						onChange={(option) => setBgColor(option)}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						title='Ширина контента'
						onChange={(option) => setContentWidth(option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setArticle(defaultArticleState);
								setFont(defaultArticleState.fontFamilyOption);
								setFontSize(defaultArticleState.fontSizeOption);
								setColor(defaultArticleState.fontColor);
								setBgColor(defaultArticleState.backgroundColor);
								setContentWidth(defaultArticleState.contentWidth);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								setArticle({
									fontFamilyOption: font,
									fontSizeOption: fontSize,
									fontColor: color,
									backgroundColor: bgColor,
									contentWidth: contentWidth,
								});
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
