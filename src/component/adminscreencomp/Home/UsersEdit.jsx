import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ReactS3 from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const AdminUserEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, usersList } = useSelector(state => state.userAuth)
    let { id } = useParams()

    let [photo, setPhoto] = useState(false)
    const [photoDataURL, setPhotoDataURL] = useState(null);
    let [isChangePhoto, setIsChangePhoto] = useState(false);



    let [profilePhoto, setProfilePhoto] = useState(false)
    const [profilePhotoDataURL, setProfilePhotoDataURL] = useState(null);
    let [isChangeProfilePhoto, setIsChangeProfilePhoto] = useState(false);

    //initialising reduzx
    let dispatch = useDispatch()
    //initialise router

    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })
    }

    useEffect(() => {
        let dataObj = usersList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)

    }, [id])


    const submitHandler = async (e) => {
        e.preventDefault()
        //uplaoding photo to aws
        let imgUrl1
        let imgUrl2

        const config = {
            dirName:process.env.REACT_APP_DIRNAME,
            bucketName:process.env.REACT_APP_BUCKETNAME,
            region:process.env.REACT_APP_REGION,
            accessKeyId:process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
            
        }

        let upload1 = async () => {
            if (!photo) {
                return
            }

            return ReactS3.uploadFile(photo, config).then(response => {

                if (response.result.status !== 204)
                    throw new Error("Failed to upload image to S3");
                else {

                    imgUrl1 = (response.location)
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }



        let upload2 = async () => {
            if (!profilePhoto) {
                return
            }

            return ReactS3.uploadFile(profilePhoto, config).then(response => {

                if (response.result.status !== 204)
                    throw new Error("Failed to upload image to S3");
                else {

                    imgUrl2 = (response.location)
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }



        await upload1()
        await upload2()

        if (!imgUrl1 || !imgUrl2) {
            // do noth
            return updateHandler(isData)
        }


        isData.passportUrl = imgUrl1
        isData.profilePhotoUrl = imgUrl2

        e.preventDefault()
        //patch case on 
        updateHandler(isData)

    }



    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setIsChangePhoto(true)
        setPhoto(file);
    }


    const changeProfilePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setIsChangeProfilePhoto(true)
        setProfilePhoto(file);
    }

    useEffect(() => {
        let fileReader, isCancel = false;

        if (photo) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {

                const { result } = e.target;

                if (result && !isCancel) {
                    console.log(result)
                    setPhotoDataURL(result)
                }
            }
            fileReader.readAsDataURL(photo);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [photo]);





    useEffect(() => {
        let fileReader, isCancel = false;

        if (profilePhoto) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {

                const { result } = e.target;

                if (result && !isCancel) {
                    console.log(result)
                    setProfilePhotoDataURL(result)
                }
            }
            fileReader.readAsDataURL(profilePhoto);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [profilePhoto]);










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
                            Tax verified
                        </label>

                        <select onChange={(e) => handleChangeHandler(e, 'taxVerified')}
                            value={isData.taxVerified}
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
                            BSA code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'bsaCode ')} value={isData.bsaCode} type='number' />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            BSA Verified
                        </label>


                        <select onChange={(e) => handleChangeHandler(e, 'bsaVerified')}
                            value={isData.bsaVerified}
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
                            Tac code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'tacCode')} value={isData.tacCode} type='number' />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            tac Verified
                        </label>


                        <select onChange={(e) => handleChangeHandler(e, 'tacVerified')}
                            value={isData.tacVerified}
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
                            Nrc code
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'nrcCode')} value={isData.nrcCode} type='text' />

                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Nrc Verified
                        </label>


                        <select onChange={(e) => handleChangeHandler(e, 'nrcVerified')}
                            value={isData.nrcVerified}
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
                            Imf code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'imfCode')} value={isData.imfCode} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Imf Verified
                        </label>

                        <select onChange={(e) => handleChangeHandler(e, 'imfVerified')}
                            value={isData.imfVerified}
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
                            Cot code
                        </label>

                        <input onChange={(e) => handleChangeHandler(e, 'cotCode')} value={isData.cotCode} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Cot Verified
                        </label>

                        <select onChange={(e) => handleChangeHandler(e, 'cotVerified')}
                            value={isData.cotVerified}
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

                        <div style={{ display: 'flex' }}>
                            <label style={{ marginRight: '45%' }}>
                                Passport
                            </label>

                            <input placeholder='pick photo' type='file' onChange={changePhotoHandler} style={{ width: '200px', height: '40px' }}/>

                        </div>


                        <img src={!photo?isData.passportUrl:photoDataURL} />
                    </div>

                    <div className={styles.inputCards}>
                        <div style={{ display: 'flex' }}>
                            <label style={{ marginRight: '45%' }}>
                                ProfilePhoto
                            </label>

                            <input placeholder='pick photo' type='file' onChange={changeProfilePhotoHandler} style={{ width: '200px', height: '40px' }}/>
                        </div>

                        <img   src={!profilePhoto?isData.profilePhotoUrl:profilePhotoDataURL} />
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