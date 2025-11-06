import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminUserEditComponent = ({ updateHandler }) => {
    const [isData, setIsData] = useState(null);
    const { color, usersList } = useSelector(state => state.userAuth);
    const { id } = useParams();

    const handleChangeHandler = (e, nameField) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setIsData(prev => ({ ...prev, [nameField]: val }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateHandler(isData);
    };

    useEffect(() => {
        const dataObj = usersList.find(data => data._id.toString() === id.toString());
        setIsData(dataObj);
    }, [id, usersList]);

    if (!isData) return null;

    return (
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <form className={styles.editForm} onSubmit={submitHandler}>

                    <h2 className={styles.sectionTitle}>User Information</h2>
                    <div className={styles.inputCards}>
                        <label>Email</label>
                        <input onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type="text" />
                    </div>
                    <div className={styles.inputCards}>
                        <label>First Name</label>
                        <input onChange={(e) => handleChangeHandler(e, 'firstName')} value={isData.firstName} type="text" />
                    </div>
                    <div className={styles.inputCards}>
                        <label>Last Name</label>
                        <input onChange={(e) => handleChangeHandler(e, 'lastName')} value={isData.lastName} type="text" />
                    </div>
                    <div className={styles.inputCards}>
                        <label>Phone Number</label>
                        <input onChange={(e) => handleChangeHandler(e, 'phoneNumber')} value={isData.phoneNumber} type="text" />
                    </div>
                    <div className={styles.inputCards}>
                        <label>Country</label>
                        <input onChange={(e) => handleChangeHandler(e, 'country')} value={isData.country} type="text" />
                    </div>
                    <div className={styles.inputCards}>
                        <label>Address</label>
                        <input onChange={(e) => handleChangeHandler(e, 'address')} value={isData.address} type="text" />
                    </div>

                    <h3 className={styles.sectionTitle}>Verification Status</h3>
                    {[
                        'emailVerified',
                        'numberVerified',
                        'infoVerified',
                        'photoVerified',
                        'accountVerified',
                        'taxVerified',
                        'bsaVerified',
                        'otpVerified',
                        'tacVerified',
                        'nrcVerified',
                        'imfVerified',
                        'cotVerified'
                    ].map((field, index) => (
                        <div className={styles.inputCards} key={index}>
                            <label>{field}</label>
                            <select
                                onChange={(e) => handleChangeHandler(e, field)}
                                value={isData[field]}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>
                        </div>
                    ))}

                    <h3 className={styles.sectionTitle}>Codes & Credentials</h3>
                    {[
                        'swiftNumber',
                        'taxCode',
                        'bsaCode',
                        'tacCode',
                        'nrcCode',
                        'imfCode',
                        'cotCode'
                    ].map((field, index) => (
                        <div className={styles.inputCards} key={index}>
                            <label>{field}</label>
                            <input
                                onChange={(e) => handleChangeHandler(e, field)}
                                value={isData[field]}
                                type="text"
                            />
                        </div>
                    ))}

                  
                    <div className={styles.imageContainer}>
                        <div className={styles.inputCards}>
                            <label>Passport</label>
                            <img src={isData.passportUrl} alt="passport" className={styles.imagePreview} />
                        </div>
                       
                    </div>

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.updateButton}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
};
