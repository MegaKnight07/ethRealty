import { useState } from "react";

const Search = () => {
    const [isFocused, setIsFocused] = useState(false);

    const headerStyle = {
        background: 'linear-gradient(135deg, #3498db, #f39c12)',
        color: '#ffffff',
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const titleStyle = {
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#ffffff',
    };

    const inputBaseStyle = {
        width: '90%',
        maxWidth: '600px',
        padding: '12px 20px',
        fontSize: '1.1em',
        borderRadius: '25px',
        outline: 'none',
        border: '2px solid #ccc',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0px 6px 18px rgba(52, 152, 219, 0.2)',
        marginTop: '10px',
    };

    const inputFocusedStyle = {
        borderColor: '#3498db',
        boxShadow: '0px 8px 20px rgba(52, 152, 219, 0.3)',
    };

    return (
        <header style={headerStyle}>
            <h2 style={titleStyle}>Search it. Explore it. Buy it.</h2>
            <input
                type="text"
                style={{
                    ...inputBaseStyle,
                    ...(isFocused ? inputFocusedStyle : {}),
                }}
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </header>
    );
};

export default Search;
