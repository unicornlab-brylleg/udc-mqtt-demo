import React from "react";

export default function useDemo() {
    const [isCopied, setCopied] = React.useState<any>('');
    const handleCopy = React.useCallback((text) => {
        console.log("inside Hook", text);
        return true
    }, []);

    return [isCopied, handleCopy];
}