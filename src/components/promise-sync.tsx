import React, { useEffect } from "react";

interface Props {
    initialCount: number;
    fetchNext: (
        cursor: number,
        count: number
    ) => Array<Promise<React.ReactNode>>;
    error: React.ReactNode;
    render: (
        elements: React.ReactNode[],
        loadNext: (count: number) => void,
        loading?: boolean
    ) => React.ReactNode | React.ReactNode[];
}

const PromiseSync: React.FunctionComponent<Props> = ({
    initialCount,
    error,
    fetchNext,
    render,
}) => {
    const [cursor, setCursor] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [elements, setElements] = React.useState<React.ReactNode[]>([]);

    const synchronize = (count: number): void => {
        setLoading(true);
        const arr = fetchNext(cursor, count);

        Promise.all(
            arr.map(p =>
                p.catch((err: Error) => {
                    console.log(err.message);
                    return error;
                })
            )
        ).then((values: React.ReactNode[]) => {
            setElements(e => [...e, ...values]);
            setLoading(false);
            setCursor(c => c + count);
        });
    };

    useEffect(() => {
        synchronize(initialCount);
    }, []);

    return <>{render(elements, synchronize, loading)}</>;
};
PromiseSync.displayName = "PromiseSync";
export default PromiseSync;
