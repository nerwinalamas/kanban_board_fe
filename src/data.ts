import { Column } from "./types";

export const initialColumns: Column[] = [
    {
        id: "column1",
        title: "Pending",
        items: [
            {
                id: "task1",
                title: "Implement user authentication",
                description: "Implement authentication using Firebase.",
                columnId: "column1",
            },
            {
                id: "task2",
                title: "Design dashboard UI",
                description: "Create wireframes and design UI components.",
                columnId: "column1",
            },
            {
                id: "task3",
                title: "Setup Redux for state management",
                description: "Integrate Redux with React application.",
                columnId: "column1",
            },
        ],
    },
    {
        id: "column2",
        title: "In Progress",
        items: [
            {
                id: "task4",
                title: "Develop API endpoints",
                description: "Implement RESTful APIs for backend services.",
                columnId: "column2",
            },
            {
                id: "task5",
                title: "Refactor components",
                description:
                    "Refactor existing React components for better performance.",
                columnId: "column2",
            },
            {
                id: "task6",
                title: "Write unit tests",
                description:
                    "Write unit tests for critical application components.",
                columnId: "column2",
            },
        ],
    },
    {
        id: "column3",
        title: "Blocked",
        items: [
            {
                id: "task7",
                title: "Resolve dependency issues",
                description:
                    "Investigate and resolve dependency conflicts in project.",
                columnId: "column3",
            },
            {
                id: "task8",
                title: "Fix performance bottlenecks",
                description:
                    "Identify and fix performance issues affecting application.",
                columnId: "column3",
            },
            {
                id: "task9",
                title: "Review code quality",
                description:
                    "Perform code reviews and provide feedback on code quality.",
                columnId: "column3",
            },
        ],
    },
    {
        id: "column4",
        title: "Done",
        items: [
            {
                id: "task10",
                title: "Deploy application to production",
                description: "Deploy application to AWS cloud platform.",
                columnId: "column4",
            },
            {
                id: "task11",
                title: "Document API endpoints",
                description: "Create API documentation for developers.",
                columnId: "column4",
            },
            {
                id: "task12",
                title: "Prepare demo presentation",
                description: "Prepare a demo presentation for stakeholders.",
                columnId: "column4",
            },
        ],
    },
];

export default initialColumns;
