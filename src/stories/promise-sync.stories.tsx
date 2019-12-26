import React from "react";
import PromiseSync from "../components/promise-sync";

export default {
    title: "Promise Sync"
};

export const promiseSync = (): React.ReactNode => <PromiseSync />;

promiseSync.story = {
    name: "Promise Sync"
};
