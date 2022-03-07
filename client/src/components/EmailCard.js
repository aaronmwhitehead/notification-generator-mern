import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const EmailCard = (props) => {
    const  email  = props.email;

    return(
        <div className="card-container">
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-email/${email._id}`}>
                        { email.title }
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default EmailCard;