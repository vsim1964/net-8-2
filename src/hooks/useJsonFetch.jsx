import {useEffect, useRef, useState} from "react";

export default function useJsonFetch(url, opts) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timestampRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setLoading(true);
            try {
                setError(null);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.status + ' ' + response.statusText);
                }
                const data = await response.json();

                if (timestampRef.current === timestamp) {
                    setData(data);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return [data, loading, error];
}
