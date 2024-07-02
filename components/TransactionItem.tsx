"use client"
import { Transaction } from "@/types/Transaction"
import { addCommas } from "@/lib/utilis"
import { toast } from "react-toastify"
import deleteTransaction from "@/app/actions/deleteTransaction"

const TransactionItem = ({transaction}:{transaction:Transaction}) => {
    const sign = transaction.amount < 0 ? "-":"+"

    const handleDeleteTransaction = async ()=>{
      const confirmed = window.confirm("Are you sure you want to delete this transaction?")

      if(!confirmed) return

    const {message, error} =  await deleteTransaction(transaction.id)
    if(error){
      toast.error(error)
      return 
    }
      toast.success(message)
    }

  return (
    <li className={transaction.amount<0?"minus":"plus"}>
        {transaction.text}
        <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
        </span>
        <button onClick={handleDeleteTransaction} className="delete-btn">X</button>
    </li>
  )
}

export default TransactionItem