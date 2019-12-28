import React from "react";
interface Props {
    initialCount: number;
    fetchNext: (cursor: number, count: number) => Array<Promise<React.ReactNode>>;
    error: React.ReactNode;
    render: (elements: React.ReactNode[], loadNext: (count: number) => void, loading?: boolean) => React.ReactNode | React.ReactNode[];
}
declare const PromiseSync: React.FunctionComponent<Props>;
export default PromiseSync;
