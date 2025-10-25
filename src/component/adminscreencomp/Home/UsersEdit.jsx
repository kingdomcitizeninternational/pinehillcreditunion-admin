import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminUserEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, usersList } = useSelector(state => state.userAuth)
    let { id } = useParams()

    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }

    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        updateHandler(isData)
    }

    useEffect(() => {
        let dataObj = usersList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)

    }, [id])



    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {usersList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Email
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            First Name
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'firstName')} value={isData.firstName} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Last Name
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'lastName')} value={isData.lastName} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Client Phone Number
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'phoneNumber')} value={isData.phoneNumber} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Client Country
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'country')} value={isData.country} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Address
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, ' address')} value={isData.address} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                        SSN/Driver license Card Number
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'nid')} value={isData.nid} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Password
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'password')} value={isData.password} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            swift Number/Route Number
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'swiftNumber')} value={isData.swiftNumber} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Wallet Balance
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'walletBalance')} value={isData.walletBalance} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Tax code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'taxCode')} value={isData.taxCode} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            BSA code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'bsaCode')} value={isData.bsaCode} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Tac code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'tacCode')} value={isData.tacCode} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                             Nrc code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'nrcCode')} value={isData.nrcCode} type='number' />
                    </div>
                    
                    <div className={styles.inputCards}>
                        <label>
                            Imf code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'imfCode')} value={isData.imfCode} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Cot code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'cotCode')} value={isData.cotCode} type='number' />
                    </div>









                    <div className={styles.inputCards}>
                        <label>
                            Passport
                        </label>

                        <img src={isData.passportUrl} />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Profile Photo
                        </label>

                        <img src={isData.profilePhotoUrl} />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            information Verified
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'infoVerified')}
                            value={isData.infoVerified}
                        >
                            <option>
                                true
                            </option>
                            <option default>
                                false
                            </option>

                        </select>


                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Account Verified
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'accountVerified')}
                            value={isData.accountVerified}
                        >
                            <option>
                                true
                            </option>
                            <option default>
                                false
                            </option>

                        </select>


                    </div>



                    <div className={styles.buttonContainer} >
                        <button >update</button>
                    </div>



                </form>}
            </div>
















        </div>



    </>)




}