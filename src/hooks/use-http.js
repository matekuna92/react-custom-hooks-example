import React, { useState, useCallback } from 'react';

const useHttp = (processData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method: 'GET',
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                    headers: requestConfig.headers ? requestConfig.headers : {}
                }
            );

        if (!response.ok) {
            throw new Error('Request failed!');
        }

        const data = await response.json();
        processData(data);

        } catch (err) {
        setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [processData]);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
}

export default useHttp;