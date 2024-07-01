"use server"

import { auth } from "@clerk/nextjs/server";

interface Transaction {
    text:string;
    amount:number;
}

interface TransactionResult{
    data?:Transaction
    error?:string
}

async function addTransaction(formData:FormData): Promise<TransactionResult>{
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    if(!textValue || !amountValue){
        return {
            error:"Text or amount is missing"
        }
    }

    const text:string = textValue.toString() //ensure text is a string
    const amount:number = parseFloat(amountValue.toString()) // parse amount as number

    // Get logged in user 
    const {userId} = auth()

    if(!userId){
        return {
            error:"User not found"
        }
    }

    const transaction:Transaction = {
        text, amount
    }
    return {
        data: transaction
    }

}

export default addTransaction