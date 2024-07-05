import { ReactNode } from "react";

type ColumnProps = {
    id: string;
    title: string;
    children: ReactNode;
};

type Item = {
    id: string;
    title: string;
    description?: string;
    columnId: string;
};

type Column = {
    id: string;
    title: string;
    items: Item[];
};
