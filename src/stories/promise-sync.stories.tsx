import React from "react";
import PromiseSync from "../components/promise-sync";

export default {
    title: "Promise Sync"
};

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const temp = (index: number): Promise<number> =>
    new Promise((resolve, reject) => {
        if (index >= 0 && index < a.length && Number.isInteger(index))
            setTimeout(() => resolve(a[index]), Math.random() * 1000);
        else reject(new Error("Invalid index supplied"));
    });

const fetchNext = (
    cursor: number,
    count: number
): Promise<React.ReactNode>[] => {
    const tempArr = [];

    for (let i = 0; i < count; i++) {
        tempArr.push(temp(cursor + i));
    }
    return tempArr;
};

export const promiseSync = (): React.ReactNode => (
    <PromiseSync
        initialCount={3}
        error={<p>Error: Invalid index for the array</p>}
        fetchNext={fetchNext}
        render={(elements, loadNext, loading): React.ReactNode => {
            return (
                <>
                    {elements.map((e, i) => (
                        <React.Fragment key={i}>
                            {e}
                            <br />
                        </React.Fragment>
                    ))}
                    <button
                        disabled={loading}
                        onClick={(): void => loadNext(2)}
                    >
                        {loading ? "Loading..." : "Next"}
                    </button>
                </>
            );
        }}
    />
);

promiseSync.story = {
    name: "Promise-Sync"
};
