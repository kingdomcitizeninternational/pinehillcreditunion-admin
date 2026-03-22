import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchAccounts } from '../../../store/action/userAppStorage';
import { Loader } from '../../common/HomeLoader';
import { Error } from "../../common/Error";

export const AdminDebitComponent = ({ updateHandler, }) => {

    let { color, admin, usersList } = useSelector(state => state.userAuth)
    let [isEmail, setIsEmail] = useState()

    //list account
    let [userAccount, setUserAccount] = useState([])
    //getting current user
    let [isCurrentUser, setIsCurrentUser] = useState(usersList[0])
    let [isCurrentAccount, setIsCurrentAccount] = useState({})

    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)


    let [isAmount, setIsAmount] = useState(false)

    let [isDate, setIsDate] = useState('')
    let [isReason, setIsReason] = useState('')

    let { id } = useParams()
    let dispatch = useDispatch()

    
    let fetchAllAccounts = async (data) => {
        setIsError(false)
        let res = await dispatch(fetchAccounts(data?data._id:isCurrentUser?._id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setUserAccount(res.message)
        setIsCurrentAccount(res.message[0])
        setIsLoading(false)
    }




    let handleEmailChangeHandler = (e, nameField) => {
        setIsLoading(true)
        setIsEmail(e.target.value)
        let newCurrentUser = usersList.find(data=>data.email === e.target.value)
        setIsCurrentUser(newCurrentUser)
        //modify current user
        fetchAllAccounts(newCurrentUser)
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },5000)
       
    }


    let handleAccountChangeHandler = (e, nameField) => {
        //find current Account
        let currentAccount = userAccount.find(data=>data.accountNumber === e.target.value)
        console.log(currentAccount)
        setIsCurrentAccount(currentAccount)
    }





    let changeAmountHandler = (e)=>{
        setIsAmount(e.target.value)
    }


    let changeDateHandler = (e)=>{
        setIsDate(e.target.value)

    }

    let changeReasonHandler = (e)=>{
        setIsReason(e.target.value)
    }
    
    useEffect(() => {
        setIsCurrentUser(usersList[0])
        fetchAllAccounts()
    }, [])


    let submitHandler = (e) => {
        e.preventDefault()
        if(!isCurrentAccount){
            return
        }
        let data ={
            user:isCurrentUser,
            account:isCurrentAccount,
            amount:isAmount,
            date:isDate,
            reason:isReason,
        }
        
        updateHandler(data)
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <form className={styles.editForm} onSubmit={submitHandler}>
                    <h2>SELECT RECIPIENT </h2>



                    <div className={styles.inputCards}>
                        <label>
                            Select client to debit
                        </label>

                        <select value={isEmail} onChange={(e) => handleEmailChangeHandler(e, 'email')}  >
                            {usersList.length > 0 && usersList.map(data => <option>{data.email}</option>)}
                        </select>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Select Account
                        </label>
                        <select onChange={(e) => handleAccountChangeHandler(e, 'account')} value={isCurrentAccount?.accountNumber} >
                            {userAccount.length > 0 && userAccount.map(data => <option>{data?.accountNumber}</option>)}
                        </select>
                    </div>


                    <h2>ACCOUNT INFORMATION </h2>


                    <div className={styles.inputCards}>
                        <label>
                            Account Name
                        </label>
                        <input value={isCurrentAccount?.accountType} readOnly
                        />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Account Number
                        </label>

                        <input value={isCurrentAccount?.accountNumber} readOnly
                        />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Account Balance
                        </label>

                        <input value={isCurrentAccount?.Balance} readOnly
                        />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Debit Amount
                        </label>

                        <input  value={isAmount} onChange={changeAmountHandler} type='number'  required
                        />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                           Reason
                        </label>

                        <input  value={isReason} onChange={changeReasonHandler} type='text'  required
                        />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                           
                        </label>

                        <input  value={isDate} onChange={changeDateHandler} type='date'  required
                        />
                    </div>



                    <div className={styles.buttonContainer} >
                        <button >Credit Client</button>
                    </div>




                </form>
            </div>






        </div></>)




}