"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
try {
    const transaction:Transaction = await db.transaction.create({
        data:{
        text,
         amount,
         userId
    } 
}) 
    revalidatePath("/")
    return {
        data: transaction
    }
} catch (error) {
    return {
        error:"Transaction not added"
    }
}
    

}

export default addTransaction