import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { name, id, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {name}{" "}
                <span style={{ float: "right" }}
                    className={"badge " +
                        (type === "professional" ? "badge-success" :
                            "badge-primary")}>
                    {type.charAt(0).toUpperCase()}{type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li
                    style={{
                        fontSize: "1.2rem"
                    }}
                >
                    <i className="fas fa-envelope-open">
                        {email}
                    </i>
                </li>)}
                {phone && (<li
                    style={{
                        fontSize: "1.2rem"
                    }}
                >
                    <i className="fas fa-phone">
                        {phone}
                    </i>
                </li>)}
            </ul>
            <p>
                <button
                    style={{
                        borderRadius: "1rem"
                    }}
                    className="btn-dark btn sm"
                    onClick={() => setCurrent(contact)}>
                    Edit
                </button>
                <button
                    style={{
                        borderRadius: "1rem"
                    }}
                    className="btn-danger btn sm"
                    onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
