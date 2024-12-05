import { ReactElement } from "react";
import { Card, CardProps } from "@component/atoms/Card";

type CardStackItem = CardProps;
export interface CardStackProps {
	items: CardStackItem[];
}

export const CardStack = ({ items }: CardStackProps): ReactElement => {
	return (
		<div className="grid gap-3 px-2 sm:px-16 md:grid-cols-2 lg:gap-x-3 lg:gap-y-4 lg:px-32">
			{items.map(
				({ title, description, preview, href }: CardStackItem, index): ReactElement => (
					<Card key={`card-${index}`} title={title} description={description} href={href} preview={preview} />
				),
			)}
		</div>
	);
};
