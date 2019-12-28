var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useEffect } from "react";
var PromiseSync = function (_a) {
    var initialCount = _a.initialCount, error = _a.error, fetchNext = _a.fetchNext, render = _a.render;
    var _b = React.useState(0), cursor = _b[0], setCursor = _b[1];
    var _c = React.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = React.useState([]), elements = _d[0], setElements = _d[1];
    var synchronize = function (count) {
        setLoading(true);
        var arr = fetchNext(cursor, count);
        Promise.all(arr.map(function (p) {
            return p.catch(function (err) {
                console.log(err.message);
                return error;
            });
        })).then(function (values) {
            setElements(function (e) { return __spreadArrays(e, values); });
            setLoading(false);
            setCursor(function (c) { return c + count; });
        });
    };
    useEffect(function () {
        synchronize(initialCount);
    }, []);
    return React.createElement(React.Fragment, null, render(elements, synchronize, loading));
};
PromiseSync.displayName = "PromiseSync";
export default PromiseSync;
