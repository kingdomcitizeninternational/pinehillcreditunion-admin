import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchHistory } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminHistoryComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [historyList, setHistoryList] = useState([])
    let [filteredHistory, setfilteredHistory] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let { user } = useParams()



    useEffect(() => {
        fetchAllHistory()
    }, [])

    let fetchAllHistory = async () => {
        setIsError(false)
        let res = await dispatch(fetchHistory(user))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setHistoryList(res.message)
        setfilteredHistory(res.message)
        setIsLoading(false)
    }



    let navigateHandler = (id) => {
        navigate(`/transaction/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)

        if (e) {
            const newData = filteredHistory.filter((item) => {
                const itemData = item.id ? item.id : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setHistoryList(newData)
            setIsLoading(false)
        } else {
            setfilteredHistory(filteredHistory)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>

            <div className={styles.filter}>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by ID' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>

            </div>

            <div className={styles.tableContainer} >

                <table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Status</td>
                            <td>Type Of Transaction</td>
                        </tr>

    
                        
                        {historyList.map(data => <tr key={data.__id} onClick={() => { navigateHandler(data._id) }}>
                            <td>{data.id}</td>
                            <td>{data.date.substring(0, 10)}</td>
                            <td>${data.amount}</td>
                            <td>{data.status}</td>
                            <td>{data.transactionType}</td>
                
                        </tr>)}


                    </tbody>
                </table>




            </div>



        </div>



    </div>)




}