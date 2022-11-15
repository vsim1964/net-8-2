import React from "react";
import useJsonFetch from "../hooks/useJsonFetch";

export default function GetData() {
    const [data, loading, error] = useJsonFetch('http://localhost:7070/data', {});

    if (loading)
        return <p>Loading</p>;

    if (error)
        return <p>Error! {error}</p>

    return (
        <pre>{JSON.stringify(data, null, 4)}</pre>
    );
}
