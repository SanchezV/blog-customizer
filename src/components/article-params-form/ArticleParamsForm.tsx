import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setArticleState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement | null>(null);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const updateArticleState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />

			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							updateArticleState('fontFamilyOption', option)
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>

					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => updateArticleState('fontSizeOption', option)}
						title='размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						onChange={(option) => updateArticleState('fontColor', option)}
						options={fontColors}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						onChange={(option) => updateArticleState('backgroundColor', option)}
						options={backgroundColors}
						title='цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						onChange={(option) => updateArticleState('contentWidth', option)}
						options={contentWidthArr}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
